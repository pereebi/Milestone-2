// import the client connection from the database file
// @ts-ignore
import client from "../database";

// create and export a type for the Orders
export type Order = {
    products_id: number,
    product_quantity: number,
    users_id: number,
    order_status: string
}

// create and export a class for the CRUD methods
export class AllOrders {

    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            let connection = await client.connect();
            const sql = "SELECT * FROM orders";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Cannot get orders ${error}`);
        }
    } 

     // create new product
     async create(order: Order): Promise<Order> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const text = "INSERT INTO orders(products_id, product_quantity, users_id, order_status) VALUES($1, $2, $3) RETURNING *";
            const values = [order.products_id, order.product_quantity, order.users_id, order.order_status];
            const res = await connection.query(text, values);
            console.log(res.rows[0]);
            return res.rows[0];
        } catch (error) {
            throw new Error(`could not create new order ${error}`)
        }
    }

    // get a item from the database
    async show(id: string): Promise<Order> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not find order ${id}, Error: ${error}`);
        }
    }
    
    // add a product to an order
    async addProduct(quantity: number, order_id: number, product_id: number): Promise<Order> {
        try {
            // @ts-ignore
            const connection = await client.connect();
            const sql = 'INSERT INTO order_products(quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [quantity, order_id, product_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`could not add product ${product_id} to order ${order_id}: ${error}`);
        }
    }

}
