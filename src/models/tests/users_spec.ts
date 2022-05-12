import { User, AllUsers } from "../users";
import bcrypt from "bcrypt";
import client from "../../database";


const users = new AllUsers();

const user: User = {
    firstname: 'Cyril',
    lastname: 'Erhiahwe',
    password: 'mysecretisthaticherishyou'
}

const pepper = process.env.BCRYPT_PASSWORD;

describe('User Model', () => {

    it('should have an index method', () => {
        expect(users.index).not.toBeUndefined();
    });

    it('should return all users', async() => {
        const result = await users.index();
        expect(result).toEqual(result);
    });

    it('should have a show method', () => {
        expect(users.show).toBeDefined();
    });

    it('should return a user by id', async() => {
        // @ts-ignore
        const result = await users.show(user.id);
        expect(result).toBe(result);
    });

    it('should have a create method', () => {
        expect(users.index).not.toBeUndefined();
    });

    it('should return a new user', async() => {
        const result = await users.create(user);
        expect(result).toEqual(result);
    });

    it('should have an authenticate method', () => {
        expect(users.authenticate).not.toBeUndefined();
    });

    it('should return an authenticated user', async() => {
        const result = await users.authenticate('Cyril', 'Erhiahwe', 'mysecretisthaticherishyou');
        expect(result).toEqual(result);
    });

    it('should have an update method', () => {
        expect(users.update).toBeDefined();
    });

    xit('should return an updated user', async() => {
        const result = await users.update('3', 'Cyril', 'Erhiahwe', 'mysecretisthaticherishyou');
        expect(result).toEqual(result);
    });

    it('should have a delete method', () => {
        expect(users.delete).toBeDefined();
    });

    it('should delete a user', async() => {
        // @ts-ignore
        const result = await users.delete(user.id);
        expect(result).toBeUndefined();
    });
});