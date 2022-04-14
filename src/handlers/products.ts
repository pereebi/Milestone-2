import express, { NextFunction, Request, Response } from 'express';
import { Product, AllProducts } from '../models/products';
import jwt from "jsonwebtoken";
import { verifyAuthToken } from './users';


const products = new AllProducts();

const index = async (req: Request, res: Response) => {
    const myProducts = await products.index();
    res.json(myProducts);
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const myProducts = await products.show(id);
        res.json(myProducts);
    } catch (error) {
        res.status(400).json(error);

    }
  
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };

    try {
        const newProduct = await products.create(product);
        res.json(newProduct);
    } catch (error) {
        res.status(400).json(error);
    }
}

const showProduct = async (req: Request, res: Response) => {
    try {
        const category = req.query.category as string;
        console.log(category);
        const myProducts = await products.showProduct(category);
        res.json(myProducts);
    } catch (error) {
        res.status(400).json(error);

    }
  
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { name, price, category } = req.body;
        const myProducts = await products.update(id, name, price, category);
        res.json(myProducts);
        console.log(myProducts);
    } catch (error) {
        res.status(400).json(error);

    }
    
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const myProducts = await products.delete(id);
        res.json(myProducts);
    } catch (error) {
        res.status(400).json(error);

    }
   
}


const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products', verifyAuthToken, create);
    app.get('/products/:id', show);
    app.get('/product/?category', showProduct);
    app.put('/products/:id', verifyAuthToken, update);
    app.delete('/products/:id', verifyAuthToken, deleteProduct);
}

export default products_routes;