const { Pool } = require('pg');
require('dotenv').config();

const isProduction = Boolean(process.env.DATABASE_URL);

const pool = new Pool(
  isProduction
    ? {
        user: process.env.DB_USER,
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT || 5432,
      }
    : {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
);

module.exports = pool;
