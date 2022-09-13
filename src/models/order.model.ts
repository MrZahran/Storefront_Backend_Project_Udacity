import User from "../database/types/user.type";
import db from "../database";
import bcrypt from "bcrypt";
import config from "../config";
import Order from "../database/types/order.type";

class GenerateOrder {
  // Create Order
  async create(order: Order): Promise<Order> {
    try {
      // Connect with DB
      const connection = await db.connect();
      const sql = `INSERT INTO orders (qty, user_id, product_id) values ($1, $2, $3) returning *`;
      // Run Query
      const result = await connection.query(sql, [
        order.qty,
        order.user_id,
        order.product_id,
      ]);
      // Release Connection
      connection.release();
      // Return Created User
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Get All Orders
  async getAllOrders(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * from orders`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (erorr) {
      throw erorr;
    }
  }

  // Get One User
  async getOrder(user_id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT * from orders WHERE id=($1)`;
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Update Order
  async updateOrder(order: Order): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE orders SET qty=$1, user_id=$2, product_id=$3 WHERE id=$4 RETURNING *`;
      const result = await connection.query(sql, [
        order.qty,
        order.user_id,
        order.product_id,
        order.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Delete Order
  async deleteOrder(id: string): Promise<Order> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM orders WHERE id=($1) RETURNING *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }
}

export default GenerateOrder;
