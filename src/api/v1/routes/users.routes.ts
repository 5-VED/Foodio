import express, { Router } from 'express';
import  {create} from '../controllers/users.controller'

const router: Router = express.Router();

router.route('/signup-user').post(create);

export default router;
