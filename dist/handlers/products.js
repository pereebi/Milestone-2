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
exports.__esModule = true;
var products_1 = require("../models/products");
var users_1 = require("./users");
// create an instance of the class imported
var products = new products_1.AllProducts();
// method to show all Products in the db
var index = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var myProducts, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, products.index()];
            case 1:
                myProducts = _a.sent();
                res.status(200).send({
                    data: myProducts,
                    message: 'Products fetched'
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(400).send('Bad request');
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// method to show a product by id
var show = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, myProduct, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, products.show(id)];
            case 1:
                myProduct = _a.sent();
                res.status(200).send({
                    data: myProduct,
                    message: 'Product was fetched'
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(400).send('Bad request');
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// method to create a new product in the db
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, newProduct, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product = {
                    name: req.body.name,
                    price: req.body.price,
                    category: req.body.category
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, products.create(product)];
            case 2:
                newProduct = _a.sent();
                res.status(201).send({
                    data: newProduct,
                    message: 'Successfully created'
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(401).send('Unauthorized User');
                console.log(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// method to show a product by category
var showProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var category, categoriedProducts, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                category = req.query.category;
                console.log(category);
                return [4 /*yield*/, products.showProduct(category)];
            case 1:
                categoriedProducts = _a.sent();
                res.status(200).send({
                    data: categoriedProducts,
                    message: 'Sucessfully fetched the product'
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(400).send('Bad request');
                console.log(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// method to update a product in the db
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_1, price, category, myProducts, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, name_1 = _a.name, price = _a.price, category = _a.category;
                return [4 /*yield*/, products.update(id, name_1, price, category)];
            case 1:
                myProducts = _b.sent();
                res.status(200).send('Succesfully updated');
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                res.status(401).send('Unauthorized user');
                console.log(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// method to delete a product by id in the db
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, myProducts, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, products["delete"](id)];
            case 1:
                myProducts = _a.sent();
                res.status(200).send('Success');
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(401).send('Unauthorized user');
                console.log(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// create routes for the different methods
var products_routes = function (app) {
    app.get('/products', index);
    app.post('/products', users_1.verifyAuthToken, create);
    app.get('/products/:id', show);
    app.get('/product/?category', showProduct);
    app.put('/products/:id', users_1.verifyAuthToken, update);
    app["delete"]('/products/:id', users_1.verifyAuthToken, deleteProduct);
};
// export the routes function
exports["default"] = products_routes;
