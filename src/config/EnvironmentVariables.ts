import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const {
  SERVER_PORT,
  DEVELOPMENT,
  DATABASE_USER,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE,
  JWT_SECRET
} = process.env;
