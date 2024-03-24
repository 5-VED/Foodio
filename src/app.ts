import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Express = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({ extended: true }));

export { app };
