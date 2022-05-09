// import necessary dependecies
import express, { NextFunction, Request, Response } from 'express';
import { Product, AllProducts } from '../models/products';
import jwt from "jsonwebtoken";
import { verifyAuthToken } from './users';

// create an instance of the class imported
const products = new AllProducts();

// method to show all Products in the db
const index = async (req: Request, res: Response) => {
    try {
        const myProducts = await products.index();
        res.status(200).send({ 
            data: myProducts, 
            message: 'Products fetched' 
        });
    } catch (error) {
        res.status(400).send('Bad request');
        console.log(error);
    }
    
}

// method to show a product by id
const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const myProduct = await products.show(id);
        res.status(200).send({ 
            data: myProduct, 
            message: 'Product was fetched' 
        });
    } catch (error) {
        res.status(400).send('Bad request');
        console.log(error);
    }
}

// method to create a new product in the db
const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    };

    try {
        const newProduct = await products.create(product);
        res.status(201).send({ 
            data: newProduct, 
            message: 'Successfully created' 
        });
    } catch (error) {
        res.status(401).send('Unauthorized User');
        console.log(error);
    }
}

// method to show a product by category
const showProduct = async (req: Request, res: Response) => {
    try {
        const category = req.query.category as string;
        console.log(category);
        const categoriedProducts = await products.showProduct(category);
        res.status(200).send({ 
            data: categoriedProducts, 
            message: 'Sucessfully fetched the product' 
        });
    } catch (error) {
        res.status(400).send('Bad request');
        console.log(error);
    }
  
}

// method to update a product in the db
const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { name, price, category } = req.body;
        const myProducts = await products.update(id, name, price, category);
        res.status(200).send('Succesfully updated');
    } catch (error) {
        res.status(401).send('Unauthorized user');
        console.log(error);
    }
    
}

// method to delete a product by id in the db
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const myProducts = await products.delete(id);
        res.status(200).send('Success');
    } catch (error) {
        res.status(401).send('Unauthorized user');
        console.log(error);
    }
   
}

// create routes for the different methods
const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products', verifyAuthToken, create);
    app.get('/products/:id', show);
    app.get('/product/?category', showProduct);
    app.put('/products/:id', verifyAuthToken, update);
    app.delete('/products/:id', verifyAuthToken, deleteProduct);
}

// export the routes function
export default products_routes;