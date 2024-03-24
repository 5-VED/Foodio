import dotenv from 'dotenv';
import path from 'path';
// import { IEnvironmentVariables } from '../api/v1/interfaces/IEnvironmentVariables';

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
} = process.env;
