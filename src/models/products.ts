// @ts-ignore
import client from "../database";

export type Product = {
    name: string,
    price: number,
    category: string
}

export class AllProducts {
        // read the database
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            let connection = await client.connect();
            const sql = "SELECT * FROM products";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get products ${error}`);
        }
    } 

        // get a item from the database
    async show(id: string): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find products ${id}, Error: ${error}`);
        }
    }
    
    // create new product
    async create(product: Product) {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const text = "INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *";
            const values = [product.name, product.price, product.category];
            const res = await connection.query(text, values);
            console.log(res.rows[0]);
            return res.rows[0];
        } catch (error) {
            throw new Error(`could not create new data in the db ${error}`)
        }
    }

        // get a product by category from the database
    async showProduct(category: string): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await connection.query(sql, [category]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find products by ${category}, Error: ${error}`);
        }
    }

         // update an item in the database by id
    async update(id: string, name: string, price: number, category: string): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'UPDATE products SET name = $1, price = $2, category = $3 WHERE id=($4) RETURNING *';
            const values = [name, price, category, id];
            const result = await connection.query(sql, values);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not update product ${id}. Error: ${error}`);        
        }
    }   
    
    // delete from the database
   async delete(id: string): Promise<Product> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            const books = result.rows[0];
            connection.release();
            return books;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
}

