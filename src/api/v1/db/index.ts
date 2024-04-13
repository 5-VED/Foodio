import { Pool } from 'pg';
import { logger } from '../../../config/Logger';

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
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection to be established
};

let dbConn: Pool = new Pool(dbConfig);
// let dbConn;
export const handleDisconnections = async () => {

  dbConn.connect((error: any, client: any) => {
    if (error) {
      logger.error('Error Connecting to DataBase', error);
    } else {
      logger.info(`Connected to DataBase at : ${client.host}`);
      logger.info(`Connection released ${client.processID}`);
      logger.info(`DB Status: ${client.connection.stream.readyState}`);
    }
  });
};

export default dbConn;
