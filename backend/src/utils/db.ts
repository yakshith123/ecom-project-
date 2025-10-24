import { Pool } from "pg";

// Database configuration for production and development
const isProduction = process.env.NODE_ENV === 'production';

export const pool = new Pool(
  isProduction && process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      }
    : {
        user: 'yakshith',
        host: 'localhost',
        database: 'ecommerce',
        port: 5432
      }
);