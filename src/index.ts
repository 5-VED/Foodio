import { app } from './app';
import { client } from './api/v1/db';
import { logger } from './config/Logger';
import { SERVER_PORT, DEVELOPMENT } from './config/EnvironmentVariables';

const dbConnection = async () => {
  client.connect().then(() => {
    logger.info('Connected to PostgreSQL database');
    client.end().then(() => {
      logger.info('Connection to PostgreSQL closed');
    });
  });
};

if (DEVELOPMENT) {
  dbConnection()
    .then(() => {
      app.listen(SERVER_PORT, () => {
        logger.info(`Server is on at port ${SERVER_PORT}`);
      });
    })
    .catch((error) => {
      logger.error('Error occured while on server', error.message);
    });
}
