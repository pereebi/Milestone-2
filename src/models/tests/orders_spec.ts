import { Order, AllOrders } from "../orders";

const orders = new AllOrders();

const order: Order = {
    products_id: 1,
    product_quantity: 1,
    users_id: 1,
    order_status: 'open'
}

describe('Order Model', () => {
    it('should have an index method', () => {
        expect(orders.index).toBeDefined();
    });

    it('should return a list of orders', async() => {
        const result = await orders.index();
        expect(result).toBe(result);
    });

    it('should have a create method', () => {
        expect(orders.create).toBeDefined();
    });

    xit('should return a new order', async() => {
        const result = await orders.create(order);
        expect(result).toEqual(result);        
    });

    it('should have an show method', () => {
        expect(orders.show).toBeDefined();
    });

    it('should return an order by id', async() => {
        // @ts-ignore
        const result = await orders.show(order.id);
        expect(result).toBe(result);
    });

    it('should have an addProduct method', () => {
        expect(orders.addProduct).toBeDefined();
    });

    // xit('should return add product to an order', async() => {
    //     const result = await orders.addProduct(quantity, order_id, product_id);
    //     expect(result).toBe(result);
    // });    

});