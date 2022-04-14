import express, { NextFunction, Request, Response } from 'express';
import { User, AllUsers } from '../models/users';
import jwt from "jsonwebtoken";
import { textSpanContainsPosition } from 'typescript';

const users = new AllUsers();

const index = async (req: Request, res: Response) => {
    const allUsers = await users.index();
    res.json(allUsers);
}

const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const theUser = await users.show(id);
        res.json(theUser);
    } catch (error) {
        res.status(400).json(error);

    }
}

const create = async (req: Request, res: Response ) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try { 
        const newUser = await users.create(user);
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (error) {
        res.status(400).json(error);
    }
   
};

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const userAuthenticated = await users.authenticate(req.body.firstname, req.body.lastname, req.body.password);
        const token = jwt.sign({ user: userAuthenticated }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (error) {
        res.status(401);
    res.json({ error });    
    }
}

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        next();
    } catch (error) {
        res.status(401);
        res.json({ error });
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { firstname, lastname, password } = req.body;
        const allUsers = await users.update(id, firstname, lastname, password);
        res.json(allUsers);
        console.log(allUsers);
    } catch (error) {
        res.status(400).json(error);

    }
    
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const oneUser = await users.delete(id);
        res.json(oneUser);
    } catch (error) {
        res.status(400).json(error);

    }
   
}


const users_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.post('/login', authenticate);
    app.put('/users/:id', verifyAuthToken, update);
    app.delete('/users/:id', verifyAuthToken, deleteUser);
    
}

export default users_routes;

