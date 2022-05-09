// import the necessary dependecies and functions
import express, { NextFunction, Request, Response } from 'express';
import { User, AllUsers } from '../models/users';
import jwt from "jsonwebtoken";
import { textSpanContainsPosition } from 'typescript';

// create an instance of class of users imported
const users = new AllUsers();

// method to show all Users in the db
const index = async (req: Request, res: Response) => {
    try {
        const allUsers = await users.index();
        res.status(200).send({ 
            data: allUsers,
            message: 'Successfully fetched all users'
        });
    } catch (error) {
        res.status(400).send('Bad request');
    }
}

// method to show a user by id
const show = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const theUser = await users.show(id);
        res.status(200).send({ 
            data: theUser,
            message: 'Successfully fetched user'
        });
    } catch (error) {
        res.status(400).send('Bad request');
    }
}

// method to create a new user in the db
const create = async (req: Request, res: Response ) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try { 
        const newUser = await users.create(user);
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.status(201).send('Successfully Signed up');
        console.log(token);
    } catch (error) {
        res.status(401).send('Unauthorized user');
    }
   
};

// method to authenticate the user logining in
const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    try {
        const userAuthenticated = await users.authenticate(req.body.firstname, req.body.lastname, req.body.password);
        const token = jwt.sign({ user: userAuthenticated }, process.env.TOKEN_SECRET as string);
        res.status(201).send('Successfully Login');
        console.log(token);
    } catch (error) {
        res.status(400).send('Bad request');   
    }
}

// method to verify that the user is suing an authorized token
export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET as string);
        next();
    } catch (error) {
        res.status(400).send('Bad request');
    }
}

// method to update a user in the db
const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { firstname, lastname, password } = req.body;
        const allUsers = await users.update(id, firstname, lastname, password);
        res.send('Successfully updated').status(202);
        console.log(allUsers);
    } catch (error) {
        res.status(401).send('Unauthorized user');
    }
}

// method to delete a user by id in the db
const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const oneUser = await users.delete(id);
        res.send('Successfully deleted User').status(200);
    } catch (error) {
        res.status(401).send('Unauthorized user');
    }
   
}

// create routes for the different methods
const users_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, show);
    app.post('/users', create);
    app.post('/login', authenticate);
    app.put('/users/:id', verifyAuthToken, update);
    app.delete('/users/:id', verifyAuthToken, deleteUser);
    
}

// export the routes function
export default users_routes;

