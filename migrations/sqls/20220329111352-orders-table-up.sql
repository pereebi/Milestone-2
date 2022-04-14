CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    products_id integer,
    product_quantity integer,
    users_id integer,
    order_status text
);