CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    products_id bigint REFERENCES products(id),
    product_quantity integer,
    users_id bigint REFERENCES users(id),
    order_status VARCHAR(70)
);