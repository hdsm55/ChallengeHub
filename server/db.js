const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // مطلوب لتجاوز مشكلة SSL في Render
  },
});

module.exports = pool;
