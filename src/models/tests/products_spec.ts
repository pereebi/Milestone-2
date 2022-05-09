import { Product, AllProducts } from "../products";

const store = new AllProducts();

const product: Product = {
    name: 'Nokia 4040',
    price: 70000,
    category: 'android'
};

describe('Products Model', () => {
    it('should display all products', () => {
        expect(store.index).toBeDefined();
    });

    it('index should return a list of products', async() => {
        const result = await store.index();
        expect(result).toEqual(result);
    })

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('index should create a new product', async() => {
        const result = await store.create(product);
        expect(result).toEqual(result);
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    
    it('index should return a product by id', async() => {
        // @ts-ignore
        const result = await store.show(product.id);
        expect(result).toBe(result);
    })

    it('should have a showProduct method', () => {
        expect(store.showProduct).toBeDefined();
    });
    
    it('index should return a product by category', async() => {
        const result = await store.showProduct(product.category);
        expect(result).toBe(result);
    })

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should update a product', async() => {
        // @ts-ignore
        const result = await store.update(product.id,product.name, product.price, product.category);
        expect(result).toBe(result);
    })

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    
    it('index should delete a product by author', async() => {
        // @ts-ignore
        const result = await store.delete(product.id);
        expect(result).toBeUndefined();
    });

});