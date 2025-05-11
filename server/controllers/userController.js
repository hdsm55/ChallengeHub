const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // تحقق من وجود البريد
    const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (checkEmail.rows.length > 0) {
      return res.status(409).json({ error: '📧 هذا البريد الإلكتروني مسجّل مسبقًا.' });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // إنشاء المستخدم
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash)
   VALUES ($1, $2, $3) RETURNING id, username, email, created_at`,
      [username, email, hashedPassword]
    );


    const newUser = result.rows[0];

    // إنشاء التوكن
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user: newUser });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: '📧 هذا البريد الإلكتروني مسجّل مسبقًا.' });
    }

    console.error('❌ Error creating user:', err);
    res.status(500).json({ error: 'حدث خطأ في الخادم.' });
  }
};

module.exports = { createUser };
