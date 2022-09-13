/* Replace with your SQL commands */

CREATE TABLE order_products (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  order_id INTEGER,
  qty INTEGER,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
)