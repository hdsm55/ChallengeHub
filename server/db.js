const { Pool } = require('pg');
require('dotenv').config();

console.log("🧠 الاتصال بقاعدة:", process.env.DATABASE_URL || process.env.DB_NAME);

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT || 5432
      }
);

module.exports = pool;
