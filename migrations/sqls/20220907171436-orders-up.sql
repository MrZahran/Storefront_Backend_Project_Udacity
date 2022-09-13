/* Replace with your SQL commands */

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  qty INTEGER,
  user_id INTEGER,
  product_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)