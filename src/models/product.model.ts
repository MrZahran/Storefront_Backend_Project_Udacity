import User from "../database/types/user.type";
import db from "../database";
import bcrypt from "bcrypt";
import config from "../config";
import Product from "../database/types/product";

class ProductModel {
  // Create Product
  async createProduct(p: Product): Promise<Product> {
    try {
      // Connect with DB
      const connection = await db.connect();
      const sql = `INSERT INTO products (title, price) values ($1, $2) returning *`;
      // Run Query
      const result = await connection.query(sql, [p.title, p.price]);
      // Release Connection
      connection.release();
      // Return Created User
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Get All Products
  async getAllProducts(): Promise<Product[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, title, price from products`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (erorr) {
      throw erorr;
    }
  }

  // Get One User
  async getOneProduct(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `SELECT title, price from products WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Update Products
  async updateProducts(p: Product): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE products SET title=$1, price=$2 WHERE id=$3 RETURNING id, title, price`;
      const result = await connection.query(sql, [p.title, p.price, p.id]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Delete Products
  async deleteProducts(id: string): Promise<Product> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM products WHERE id=($1) RETURNING id, title, price`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }
}

export default ProductModel;
