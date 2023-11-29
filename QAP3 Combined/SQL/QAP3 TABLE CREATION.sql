-- Create a table for games
CREATE TABLE games (
    game_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    release_date DATE,
    price DECIMAL(10, 2) NOT NULL
);

-- Create a table for customers
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    registration_date DATE
);

-- Create a table for orders
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id) ON DELETE CASCADE,
    order_date DATE,
    total_amount DECIMAL(10, 2) NOT NULL
);

-- Create a table for order details (games in each order)
CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES games(game_id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);
