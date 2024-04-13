import dbConn from '../db/index';
import { logger } from '../../../config/Logger';
import { IUser } from '../interfaces/user.interface';
import { Request } from 'express';

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
    console.log("params=============>",params);
    // dbConn.query(query, params, errorMsg, infoMsg, result);
    dbConn.query(query, function (error: Error, result: any) {
      if (error) {
        logger.error('Error in creating new User');
        result(null, error);
      } else {
        logger.info('User created successfully');
        console.log("result==============>",result)
        result(null, result);
      }
    });
  }
}

export default User;
