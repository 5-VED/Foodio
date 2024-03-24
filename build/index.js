"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
const db_1 = require("./api/v1/db");
dotenv_1.default.config({
    path: './.env',
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    db_1.client.connect().then(() => {
        console.log('Connected to PostgreSQL database');
        // client.query('SELECT * FROM users', (error, result) => {
        //   if (error) {
        //     console.error('Error executing query', error);
        //   } else {
        //     console.log('result', result.rows);
        //   } 
        // });
        db_1.client.end().then(() => {
            console.log('Connection to PostgreSQL closed');
        });
    });
});
dbConnection()
    .then(() => {
    app_1.app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is on at port ${process.env.SERVER_PORT}`);
    });
})
    .catch((error) => {
    console.error('Error occured while on server =====>', error);
});
