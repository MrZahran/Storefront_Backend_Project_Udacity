import dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  DB_PORT,
  PEPER_PASSWORD,
  SECRET_TOKEN,
} = process.env;

export default {
  host: POSTGRES_HOST,
  db_name: NODE_ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST,
  db_user: POSTGRES_USER,
  db_pass: POSTGRES_PASSWORD,
  db_port: DB_PORT,
  peper: PEPER_PASSWORD,
  token: SECRET_TOKEN,
};
