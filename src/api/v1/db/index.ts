import { Client } from 'pg';
import {
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE,
  DATABASE_PORT,
} from '../../../config/EnvironmentVariables';

const dbConfig = {
  user: DATABASE_USER,
  host: DATABASE_HOST,
  password: DATABASE_PASSWORD,
  database: DATABASE,
  port: parseInt(DATABASE_PORT || '5432'),
};

export const client = new Client(dbConfig);
