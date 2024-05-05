import { Client, Pool, PoolClient } from 'pg';
import { logger } from '../../../config/Logger';

import {
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE,
  DATABASE_PORT,
} from '../../../config/EnvironmentVariables';
import { error } from 'console';

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

/**
 * @description Utility Function to execute query in functions
 * @param queryStr
 * @param params
 * @param errorMsg
 * @param infoMsg
 * @param callback
 */
export const executeQuery = async (
  queryStr: string,
  params: any[] | null,
  errorMsg: string,
  infoMsg: string,
  callback: (error: Error | null, result: any) => void
) => {
  try {
    dbConn.connect(
      async (
        err: Error | undefined,
        client: PoolClient | undefined,
        done: (release?: any) => void
      ) => {
        if (params) {
          await client?.query(
            queryStr,
            params,
            (error: Error, response: any) => {
              if (error) {
                logger.error(errorMsg + ': ' + error);
                callback(error, null);
              } else {
                if (response.rowCount > 0) {
                  logger.info(infoMsg + ' ' + response.rowCount);
                  callback(null, response.rows);
                } else {
                  logger.info(infoMsg);
                  callback(null, response);
                }
              }
              client.release();
              // logger.info(`Connection released ${}`)
            }
          );
        } else if (client) {
          await client.query(queryStr, (error, response) => {
            if (error) {
              logger.error(errorMsg + ': ' + error);
              callback(error, null);
            } else {
              if (
                response &&
                response.rowCount !== null &&
                response.rowCount > 0
              ) {
                logger.info(infoMsg + ' ' + response.rowCount);
                callback(null, response.rowCount);
              } else {
                logger.info(infoMsg);
                callback(null, response);
              }
            }
            client.release();
          });
        } else {
          console.log('No Connection found');
        }
      }
    );
  } catch (error) {
    throw Error();
  }
};
export default dbConn;
