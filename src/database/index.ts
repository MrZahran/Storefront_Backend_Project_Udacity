import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  host: config.host,
  database: config.db_name,
  user: config.db_user,
  password: config.db_pass,
  port: parseInt(config.db_port as string),
});

pool.on("error", (error) => {
  console.error(error.message);
});

export default pool;
