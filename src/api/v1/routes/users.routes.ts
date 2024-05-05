import express, { Router } from 'express';
import { create, login } from '../controllers/users.controller'

const router: Router = express.Router();

router.route('/signup-user').post(create);

router.route('/signin-user').post(login);

export default router;
