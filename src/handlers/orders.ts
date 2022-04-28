// import necessary dependecies
import express, { NextFunction, Request, Response } from 'express';
import {Order, AllOrders } from '../models/orders';
import jwt from "jsonwebtoken";
import { verifyAuthToken } from './users';

const orders = new AllOrders;

// method to show all Orders in the db
const index = async (req: Request, res: Response) => {
    const currentOrders = await orders.index();
    res.json(currentOrders);
}

// method to show a order by id
const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const singleOrder = await orders.show(id);
        res.json(singleOrder);
    } catch (error) {
        res.status(400).json(error);

    }
}

// method to create a new order in the db
const create = async (req: Request, res: Response) => {
    const order: Order = {
        products_id: req.body.products_id,
        product_quantity: req.body.product_quantity,
        users_id: req.body.users_id,
        order_status: req.body.order_status
    };

    try {
        const newOrder = await orders.create(order);
        res.json(newOrder);
    } catch (error) {
        res.status(400).json(error);
    }
}

// add a product to an order
const addProduct = async (req: Request, res: Response) => {
    try {
        const order_id = parseInt(req.params.id);
        const product_id = req.body.product_id;
        const quantity = parseInt(req.body.quantity);
        const addProduct = await orders.addProduct(order_id, product_id, quantity);
        return addProduct;
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const orders_routes = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index);
    app.get('/orders/:id', verifyAuthToken, show);
    app.post('/orders', verifyAuthToken, create);
    app.post('/orders/:id/product', verifyAuthToken, addProduct);
}

export default orders_routes;