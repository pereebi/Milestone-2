"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// import dependencies and routes needed into the file
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
// create an express object
var app = (0, express_1["default"])();
// create a port or address
var address = "0.0.0.0:7001";
// use the middleware
app.use(body_parser_1["default"].json());
// call your route functions and pass an instance of your app
(0, products_1["default"])(app);
(0, users_1["default"])(app);
(0, orders_1["default"])(app);
// ensure your port and app are running
app.listen(7001, function () {
    console.log("Starting app on: ".concat(address));
});
