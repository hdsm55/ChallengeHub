    const pool = require('../db');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');

    const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. تحقق من وجود المستخدم
        const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
        );

        if (result.rows.length === 0) {
        return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // 2. تحقق من تطابق كلمة المرور
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
        return res.status(400).json({ error: 'Invalid email or password' });
        }

        // 3. أنشئ التوكن
        const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // مدة صلاحية التوكن
        );

        // 4. أرجع التوكن وبعض معلومات المستخدم
        res.status(200).json({
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
        });

    } catch (err) {
        console.error('❌ Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    };

    module.exports = { loginUser };
