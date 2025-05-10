const express = require('express');
const cors = require('cors');
const pool = require('./db'); // الاتصال بقاعدة البيانات
const challengeRoutes = require('./routes/challengeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // ← أضف هذا



// بعد الـ app.use(cors()) و app.use(express.json())

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
 origin: [
  "http://localhost:5173",
  "https://challengehub-lyart.vercel.app"
],
  credentials: true
}));

app.use(express.json()); // لقبول JSON من العميل

app.use('/users', userRoutes);
app.use('/challenges', challengeRoutes);
app.use('/auth', authRoutes); // ← أضف هذا

// اختبار الاتصال بقاعدة البيانات
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Database connected at:', res.rows[0].now);
  }
});

// مسار تجريبي
app.get('/', (req, res) => {
  res.send('🚀 ChallengeHub API is running');
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
