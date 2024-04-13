import { Request, Response } from 'express';
import { HTTP_CODES } from '../../../config/HttpStatusCodes';
import { logger } from '../../../config/Logger';
import { asyncHandler } from '../../../utils/AsyncHandaler';
import { ApiError } from '../../../utils/ApiError';
import { ApiResponse } from '../../../utils/ApiResponse';
import User from '../models/users.model';

export const create = asyncHandler(async (req: Request, res: Response) => {
  const new_user: User = new User(req);

  console.log(new_user)
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    logger.error('Please fill all the details');
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      message: 'Please fill all the details',
      success: false,
      data: null,
    });
  }



});
