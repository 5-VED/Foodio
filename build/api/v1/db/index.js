"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const pg_1 = require("pg");
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    password: 'PostgressPwd',
    database: 'Foodio',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
};
exports.client = new pg_1.Client(dbConfig);
