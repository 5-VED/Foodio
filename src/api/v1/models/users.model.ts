import { Request } from 'express';
import dbConn from '../db/index';
import { logger } from '../../../config/Logger';
import { IUser } from '../interfaces/user.interface';
import { executeQuery } from '../db/index';

class User implements IUser {
  firstName: string;
  lastName: string;
  contactNo: string;
  email: string;
  password: string;
  role: string;
  photo: string;

  constructor(req: Request) {
    this.firstName = req.body.firstName;
    this.lastName = req.body.lastName;
    this.contactNo = req.body.contactNo;
    this.email = req.body.email;
    this.password = req.body.password;
    this.role = req.body.role;
    this.photo = req.body.photo;
  }

  static create(newUser: User, result: any) {
    let query =
      'INSERT INTO users (firstName,lastName,contactNo,email,password,role,photo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
    let errorMsg: string = 'Error in Inserting new User';
    let params: string[] = [
      newUser.firstName,
      newUser.lastName,
      newUser.contactNo,
      newUser.email,
      newUser.password,
      newUser.role,
      newUser.photo,
    ];
    let infoMsg = 'User Inserted with id:';
    executeQuery(query, params, errorMsg, infoMsg, result);
  }

  static MatchMail(email: String, result: any) {
    let query = 'SELECT * FROM users WHERE email = ' + email;
    let params = null;
    let errorMsg = 'Error in Inserting new User';
    let infoMsg = 'User Inserted with id:';
    executeQuery(query, params, errorMsg, infoMsg, result);
  }

  
}

export default User;
