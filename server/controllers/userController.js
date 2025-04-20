const pool = require('../db');
const bcrypt = require('bcrypt');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // تشفير كلمة السر
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3) RETURNING id, username, email, created_at`,
      [username, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error creating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createUser };
