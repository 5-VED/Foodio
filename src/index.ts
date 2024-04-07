import { app } from './app';
import { handleDisconnections } from './api/v1/db';
import { logger } from './config/Logger';
import { SERVER_PORT, DEVELOPMENT } from './config/EnvironmentVariables';


if (DEVELOPMENT) {
  handleDisconnections()
    .then(() => {
      app.listen(SERVER_PORT, () => {
        logger.info(`Server is on at port ${SERVER_PORT}`);
      });
    })
    .catch((error) => {
      logger.error('Error Spinning up Server ' + error);
    });
}
