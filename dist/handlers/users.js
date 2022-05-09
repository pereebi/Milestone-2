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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyAuthToken = void 0;
var users_1 = require("../models/users");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// create an instance of class of users imported
var users = new users_1.AllUsers();
// method to show all Users in the db
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users.index()];
            case 1:
                allUsers = _a.sent();
                res.status(200).send({
                    data: allUsers,
                    message: 'Successfully fetched all users'
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).send('Bad request');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// method to show a user by id
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, theUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, users.show(id)];
            case 1:
                theUser = _a.sent();
                res.status(200).send({
                    data: theUser,
                    message: 'Successfully fetched user'
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).send('Bad request');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// method to create a new user in the db
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, token, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, users.create(user)];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: newUser }, process.env.TOKEN_SECRET);
                res.status(201).send('Successfully Signed up');
                console.log(token);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(401).send('Unauthorized user');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// method to authenticate the user logining in
var authenticate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userAuthenticated, token, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, users.authenticate(req.body.firstname, req.body.lastname, req.body.password)];
            case 2:
                userAuthenticated = _a.sent();
                token = jsonwebtoken_1["default"].sign({ user: userAuthenticated }, process.env.TOKEN_SECRET);
                res.status(201).send('Successfully Login');
                console.log(token);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(400).send('Bad request');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// method to verify that the user is suing an authorized token
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(400).send('Bad request');
    }
};
exports.verifyAuthToken = verifyAuthToken;
// method to update a user in the db
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, firstname, lastname, password, allUsers, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, password = _a.password;
                return [4 /*yield*/, users.update(id, firstname, lastname, password)];
            case 1:
                allUsers = _b.sent();
                res.send('Successfully updated').status(202);
                console.log(allUsers);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                res.status(401).send('Unauthorized user');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// method to delete a user by id in the db
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, oneUser, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, users["delete"](id)];
            case 1:
                oneUser = _a.sent();
                res.send('Successfully deleted User').status(200);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(401).send('Unauthorized user');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// create routes for the different methods
var users_routes = function (app) {
    app.get('/users', exports.verifyAuthToken, index);
    app.get('/users/:id', exports.verifyAuthToken, show);
    app.post('/users', create);
    app.post('/login', authenticate);
    app.put('/users/:id', exports.verifyAuthToken, update);
    app["delete"]('/users/:id', exports.verifyAuthToken, deleteUser);
};
// export the routes function
exports["default"] = users_routes;
