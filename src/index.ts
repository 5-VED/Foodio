import dotenv from 'dotenv';
import { app } from './app';
import { client } from './api/v1/db';

dotenv.config({
  path: './.env',
});

const dbConnection = async () => {
  client.connect().then(() => {
    console.log('Connected to PostgreSQL database');

    // client.query('SELECT * FROM users', (error, result) => {
    //   if (error) {
    //     console.error('Error executing query', error);
    //   } else {
    //     console.log('result', result.rows);
    //   }
    // });

    client.end().then(() => {
      console.log('Connection to PostgreSQL closed');
    });
  });
};

if (process.env.DEVELOPMENT) {
  dbConnection()
    .then(() => {
      app.listen(process.env.SERVER_PORT, () => {
        console.log(`>>>>>>> Server is on at port ${process.env.SERVER_PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error occured while on server =====>', error);
    });
}
