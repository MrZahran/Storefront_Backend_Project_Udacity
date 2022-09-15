import User from "../database/types/user.type";
import db from "../database";
import bcrypt from "bcrypt";
import config from "../config";
import { ProductToOrder } from "../database/types/order.type";
import Order from "../database/types/order.type";

class GenerateOrder {
  // Create Order
  async create(order: Order): Promise<Order> {
    try {
      // Connect with DB
      const connection = await db.connect();
      const sql = `INSERT INTO orders (user_id, status) values ($1, $2) returning *`;
      // Run Query
      const result = await connection.query(sql, [order.user_id, order.status]);
      // Release Connection
      connection.release();
      // Return Created User
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // To Add One Or Many Product To Order
  async addProductToOrder(
    productToOrder: ProductToOrder
  ): Promise<ProductToOrder> {
    try {
      // Connect with DB
      const connection = await db.connect();
      const sql = `INSERT INTO order_products (order_id, product_id, qty) values ($1, $2, $3) returning *`;
      // Run Query
      const result = await connection.query(sql, [
        productToOrder.order_id,
        productToOrder.product_id,
        productToOrder.qty,
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
  async updateOrder(productToOrder: ProductToOrder): Promise<ProductToOrder> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE order_products SET order_id=$1, product_id=$2, qty=$3 WHERE id=$4 RETURNING *`;
      const result = await connection.query(sql, [
        productToOrder.order_id,
        productToOrder.product_id,
        productToOrder.qty,
        productToOrder.id,
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
