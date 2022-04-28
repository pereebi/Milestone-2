// import dependencies and routes needed into the file
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import products_routes from './handlers/products';
import users_routes from './handlers/users';
import orders_routes from './handlers/orders';

// create an express object
const app: express.Application = express();

// create a port or address
const address: string = "0.0.0.0:7001";

// use the middleware
app.use(bodyParser.json());

// call your route functions and pass an instance of your app
products_routes(app);
users_routes(app);
orders_routes(app);

// ensure your port and app are running
app.listen(7001, function() {
    console.log(`Starting app on: ${address}`);
})