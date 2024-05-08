import { Request } from 'express';
import { IUser } from '../interfaces/user.interface';
import { executeQuery } from '../db/index';
import { hash } from 'bcrypt';
import { ApiError } from '../../../utils/ApiError';
import { HTTP_CODES } from '../../../config/HttpStatusCodes';

class User implements IUser {
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  password: string;
  role_id: number;
  photo: string;

  constructor(req: Request) {
    this.firstName = req.body.firstName;
    this.lastName = req.body.lastName;
    this.contactNo = req.body.contactNo;
    this.email = req.body.email;
    this.password = req.body.password;
    this.role_id = req.body.role_id;
    this.photo = req.body.photo;
  }

  //------------ Function to Hash Password----------------//
  async hashPassword(password: string): Promise<string> {
    try {
      let hashedPassword = await hash(password, 10);
      return hashedPassword.toString();
    } catch (error) {
      throw new ApiError(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        'Internal server error.'
      );
    }
  }

  static async create(newUser: User, result: any) {
    let query =
      'INSERT INTO users (firstName,lastName,contactNo,email,password,role_id,photo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
    let errorMsg: string = 'Error in Inserting new User';

    // Hash the password of the users
    const password: string = (await hash(newUser.password, 10)).toString();
    newUser.password = password;

    let params: [string, string, string, string, string, number, string] = [
      newUser.firstName,
      newUser.lastName,
      newUser.contactNo,
      newUser.email,
      newUser.password,
      newUser.role_id,
      newUser.photo,
    ];
    let infoMsg = 'User Inserted with id:';
    executeQuery(query, params, errorMsg, infoMsg, result);
  }

  static MatchMail(email: string, resultCallback: any) {
    let query = 'SELECT * FROM users WHERE email = $1 ';
    let params: [string] = [email];
    let errorMsg = 'Error in Inserting new User';
    let infoMsg = 'User Inserted with id:';
    executeQuery(query, params, errorMsg, infoMsg, resultCallback);
  }

  static GetUser(email: string, resultCallback: any) {
    let query = 'SELECT * FROM users WHERE email = $1';
    let params: [string] = [email];
    let errorMsg = 'Error in Inserting new User';
    let infoMsg = 'User Inserted with id:';
    executeQuery(query, params, errorMsg, infoMsg, resultCallback);
  }


}

export default User;
