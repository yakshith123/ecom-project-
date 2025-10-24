import { Pool } from "pg";

export const pool = new Pool({
  user: 'yakshith',
  host: 'localhost',
  database: 'ecommerce',
  port: 5432
});