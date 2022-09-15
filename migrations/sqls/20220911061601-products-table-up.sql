CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE products (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, name VARCHAR(100) NOT NULL, description TEXT, price NUMERIC(6, 2) NOT NULL, category_id BIGINT REFERENCES product_categories(id));

INSERT INTO products (name, description, price) VALUES ('Soap Bar', 'Very nice soap!', 5.99);
INSERT INTO products (name, description, price) VALUES ('Tin Foil', 'Use it to cook anything!', 2.73);
INSERT INTO products (name, description, price) VALUES ('Milk', 'Moo! Grow Strong bones!', 4.99);
INSERT INTO products (name, description, price) VALUES ('Chair', 'Rest well!', 34.89);
INSERT INTO products (name, description, price) VALUES ('Bananas', 'The perfect fruit!', 4.53);
INSERT INTO products (name, description, price) VALUES ('Cereal', 'Have a good breakfast!', 8.99);
