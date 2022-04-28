"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import the dependencies needed
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
// initialize environment variables
dotenv_1["default"].config();
// reference the variables in the .env folder
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, 
// POSTGRES_TEST_DB, 
POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD;
// create a connection to the database
var client = new pg_1.Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
// let client;
// if(NODE_EVN === "dev") {
// }
// if(NODE_EVN === "test") {
//     client = new Pool({
//         host: POSTGRES_HOST,
//         database: POSTGRES_TEST_DB,
//         user: POSTGRES_USER,
//         password: POSTGRES_PASSWORD,
//       });
// }
exports["default"] = client;
