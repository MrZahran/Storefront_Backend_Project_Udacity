import User from "../database/types/user.type";
import db from "../database";
import bcrypt from "bcrypt";
import config from "../config";

function generateSecretPass(password: string) {
  return bcrypt.hashSync(`${password}${config.peper}`, 10);
}

class UserModel {
  // Create User
  async create(u: User): Promise<User> {
    try {
      // Connect with DB
      const connection = await db.connect();
      const sql = `INSERT INTO users (email, username, password) values ($1, $2, $3) returning *`;
      // Run Query
      const result = await connection.query(sql, [
        u.email,
        u.username,
        generateSecretPass(u.password),
      ]);
      // Release Connection
      connection.release();
      // Return Created User
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Get All Users
  async getAllUsers(): Promise<User[]> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, username from users`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (erorr) {
      throw erorr;
    }
  }
  // Get One User
  async getOneUser(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `SELECT id, email, username from users WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }
  // Update Users
  async updateUser(u: User): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE users SET email=$1, username=$2, password=$3 WHERE id=$4 RETURNING id, email, username`;
      const result = await connection.query(sql, [
        u.email,
        u.username,
        generateSecretPass(u.password),
        u.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Delete User
  async deleteUser(id: string): Promise<User> {
    try {
      const connection = await db.connect();
      const sql = `DELETE FROM users WHERE id=($1) RETURNING id, email, username`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (erorr) {
      throw erorr;
    }
  }

  // Authenticate Users
  async authenticate_users(
    email: string,
    password: string
  ): Promise<null | User> {
    try {
      const connection = await db.connect();
      const sql = "SELECT password FROM users WHERE email=$1";
      const result = await connection.query(sql, [email]);
      if (result.rows.length) {
        // Hash Coming From DB
        const hash = result.rows[0].password;
        const check_pass = bcrypt.compareSync(
          `${password}${config.peper}`,
          hash
        );
        if (check_pass) {
          const sql = "SELECT id, email, username FROM users WHERE email=($1)";
          const userData = await connection.query(sql, [email]);
          return userData.rows[0];
        }
      } else {
        console.log("Can't Find This E-mail");
      }
      connection.release();
      return null;
    } catch (erorr) {
      throw erorr;
    }
  }
}

export default UserModel;
