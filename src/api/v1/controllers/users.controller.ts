import { Request, Response } from 'express';
import { HTTP_CODES } from '../../../config/HttpStatusCodes';
import { logger } from '../../../config/Logger';
import { asyncHandler } from '../../../utils/AsyncHandaler';
import { ApiResponse } from '../../../utils/ApiResponse';
import User from '../models/users.model';
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from '../../../config/EnvironmentVariables';
import { compare } from 'bcrypt';


export const create = asyncHandler(async (req: Request, res: Response) => {
  const newUser: User = new User(req);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    logger.error('Please fill all the details');
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json(
        new ApiResponse(
          HTTP_CODES.BAD_REQUEST,
          null,
          'Please fill all the details',
          false
        )
      );
  }

  User.MatchMail(newUser.email, async (error: Error, existingUser: User) => {
    if (error) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
        new ApiResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error, "Internal Server Error", false)
      )
    }

    if (existingUser) {
      return res.status(HTTP_CODES.CONFLICT).json(
        new ApiResponse(HTTP_CODES.CONFLICT, existingUser, "User with this email already exist. Please take other email.", false)
      );
    }

    User.create(newUser, async (error: Error, userId: User) => {
      if (error) {
        return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
          new ApiResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error, "Internal Server Error", false)
        )
      }

      return res.status(HTTP_CODES.CREATED).json(
        new ApiResponse(HTTP_CODES.CREATED, userId, 'User created successfully', true)
      )
    });
  });
});


export const login = asyncHandler(async (req: Request, res: Response) => {

  let { email, password } = req.body

  User.GetUser(email, async (error: Error, user: any) => {

    if (error) {
      return res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(
        new ApiResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, error, "Internal Server Error", false)
      )
    }

    if (!user) {
      return res.status(HTTP_CODES.BAD_REQUEST).json(
        new ApiResponse(HTTP_CODES.BAD_REQUEST, user.rows, "User with this email does not exist.", false)
      )
    }

    if (user && user.length === 1) {
      const isPasswordValid: boolean = await compare(password, user[0].password)
      if (!isPasswordValid) {
        return res.status(HTTP_CODES.UNAUTHORIZED).json(
          new ApiResponse(HTTP_CODES.UNAUTHORIZED, null, "Please Enter valid password", false)
        )
      }

      let jwtPayload: object = { id: user[0].id, email: user[0].email }
      let token = sign(jwtPayload, JWT_SECRET!, { expiresIn: 60 * 60 })

      return res.status(HTTP_CODES.CREATED).json(
        new ApiResponse(HTTP_CODES.CREATED, { ...user[0], token }, "User log in  successfully.", true)
      )
    }
  })
})