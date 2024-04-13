// import dbConn from '../api/v1/db/index';
// import { logger } from '../config/Logger';

// interface ICallback {
//   (error: Error, result: any): void;
// }

// exports.executeQuery = (
//   queryStr: string,
//   params: any[],
//   errorMsg: string,
//   infoMsg: string,
//   callback: ICallback
// ) => {
//   dbConn.connect(async (error, client) => {
//     if (params) {
//       await client?.query(queryStr, params, (error, result) => {
//         if (error) {
//           logger.error({ message: errorMsg + ':' + error });
//         }
//       });
//       callback(error:Error, null);
//     } else {
//       if (result) {
//       }
//     }
//   });
// };
