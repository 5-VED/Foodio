import express, { Router } from 'express';

const router: Router = express.Router();

router.route('/signup-user').post();

export default router;
