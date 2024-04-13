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

export const executeQuery = async (
  queryStr: string,
  params: string[] | null,
  errorMsg: string,
  infoMsg: string,
  callback: any
) => {
  dbConn.connect(async (error, client) => {
    if (params) {
      await client?.query(queryStr, params, (error, result: any) => {
        if (error) {
          logger.error(errorMsg + ': ' + error);
          callback(error, null);
        } else {
          if (result.rowCount > 0) {
            logger.info(infoMsg + ' ' + result.insertId);
            callback(null, result.rowCount);
          } else {
            logger.info(infoMsg);
            callback(null, result);
          }
        }
        client.release();
      });
    } else if (client) {
      await client.query(queryStr, (error, result: any) => {
        if (error) {
          logger.error(errorMsg + ': ' + error);
          callback(error, null);
        } else {
          if (result.rowCount > 0) {
            logger.info(infoMsg + ' ' + result.rowCount);
            callback(null, result.rowCount);
          } else {
            logger.info(infoMsg);
            callback(null, result);
          }
          client.release();
        }
      });
    } else {
      logger.info('No Connection found');
    }
  });
};

export default dbConn;
