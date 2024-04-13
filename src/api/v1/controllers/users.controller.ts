import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/AsyncHandaler';
import User from '../models/users.model';

export const create = asyncHandler(async (req: Request, res: Response) => {
  const new_user:User = new User(req);
//   console.log("new User =========>",new_user)
});
