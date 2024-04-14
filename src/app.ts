import express, { Express } from 'express';
import  routes  from '../src/api/v1/routes/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
const app: Express = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use('/api/v1/users',routes.userRoutes)

export { app };
