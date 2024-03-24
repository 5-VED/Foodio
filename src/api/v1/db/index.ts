import { Client } from 'pg';

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  password: 'PostgressPwd',
  database: 'Foodio',
  port: parseInt(process.env.DATABASE_PORT || ''),
};

export const client = new Client(dbConfig);
