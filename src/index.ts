import dotenv from 'dotenv';
import { app } from './app';
import { client } from './api/v1/db';
import {logger } from "./config/Logger"

dotenv.config({
  path: './.env',
});

const dbConnection = async () => {
  client.connect().then(() => {
    logger.info('Connected to PostgreSQL database'); 
    client.end().then(() => {
      logger.info('Connection to PostgreSQL closed');
    });
  });
};

if (process.env.DEVELOPMENT) {
  dbConnection()
    .then(() => {
      app.listen(process.env.SERVER_PORT, () => {
        logger.info(`Server is on at port ${process.env.SERVER_PORT}`);
      });
    })
    .catch((error) => {
      logger.error('Error occured while on server', error.message);
    });
}
