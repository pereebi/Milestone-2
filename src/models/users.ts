import bcrypt from "bcrypt";
// @ts-ignore
import client from "../database";

export type User = {
    firstname: string,
    lastname: string,
    password: string
}

const pepper = process.env.BCRYPT_PASSWORD;

export class AllUsers {
    // read the database
    async index(): Promise<User[]> {
        try {
            // @ts-ignore
            let connection = await client.connect();
            const sql = "SELECT * FROM users";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get users ${error}`);
        }
    } 

     // get a item from the database
     async show(id: string): Promise<User> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find users ${id}, Error: ${error}`);
        }
    }

        // create a new user in the database
    async create(user: User): Promise<User> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const saltRounds = process.env.SALT_ROUNDS as string;
            const sql = "INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *";
            const hash = bcrypt.hashSync(user.password + pepper, parseInt(saltRounds));
            const values = [user.firstname, user.lastname, hash];
            const result = await connection.query(sql, values);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new user ${user.firstname}. Error: ${error}`);
        }
    }

    async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
        // @ts-ignore
        const connection = await client.connect();
        const sql = "SELECT password_digest FROM users WHERE firstname = ($1) AND lastname = ($2)";
        const result = await connection.query(sql, [firstname, lastname]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }

    // update an item in the database by id
    async update(id: string, firstname: string, lastname: string, password: string): Promise<User> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'UPDATE products SET firstname = $1, lastname = $2, password_digest = $3 WHERE id=($4) RETURNING *';
            const values = [firstname, lastname, password, id];
            const result = await connection.query(sql, values);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update user ${id}. Error: ${error}`);        
        }
    }   

    // delete from the database
    async delete(id: string): Promise<User> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            const books = result.rows[0];
            connection.release();
            return books;
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
}
}