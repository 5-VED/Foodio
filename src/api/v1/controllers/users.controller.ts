import { Request, Response } from 'express';
import { HTTP_CODES } from '../../../config/HttpStatusCodes';
import { logger } from '../../../config/Logger';
import { asyncHandler } from '../../../utils/AsyncHandaler';
import { ApiResponse } from '../../../utils/ApiResponse';
import User from '../models/users.model';

export const create = asyncHandler(async (req: Request, res: Response) => {
  const new_user: User = new User(req);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    logger.error('Please fill all the details');
    return res
      .status(HTTP_CODES.BAD_REQUEST)
      .json(
        new ApiResponse(
          HTTP_CODES.BAD_REQUEST,
          null,
          'Please fill all the details'
        )
      );
  }

  await User.MatchMail(
    req.body.email,
    async (error: any, response: string | any[]) => {
      if (response && response.length > 0) {
        return res
          .status(HTTP_CODES.OK)
          .json(
            new ApiResponse(
              HTTP_CODES.OK,
              response,
              'Email is already registered; Please try another one'
            )
          );
      } else {
        User.create(new_user, async (error: Error, user: any) => {
          if (user) {
            logger.info('User data added successfully!');
            return res
              .status(HTTP_CODES.OK)
              .json(
                new ApiResponse(
                  HTTP_CODES.OK,
                  user,
                  'User data added successfully!'
                )
              );
          }
        });
      }
    }
  );
});
