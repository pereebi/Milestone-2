import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import products_routes from './handlers/products';
import users_routes from './handlers/users';

const app: express.Application = express();
const address: string = "0.0.0.0:7001";

app.use(bodyParser.json());

products_routes(app);
users_routes(app);

app.listen(7001, function() {
    console.log(`Starting app on: ${address}`);
})