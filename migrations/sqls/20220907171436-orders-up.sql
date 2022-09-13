/* Replace with your SQL commands */

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)