const { Pool } = require('pg');          // استيراد مكتبة PostgreSQL
require('dotenv').config();              // تحميل متغيرات البيئة من .env

const pool = new Pool({
  user: process.env.DB_USER,             // اسم المستخدم
  host: 'localhost',                     // السيرفر المحلي
  database: process.env.DB_NAME,         // اسم قاعدة البيانات
  password: process.env.DB_PASS,         // كلمة المرور
  port: 5432                             // المنفذ الافتراضي
});

module.exports = pool;                   // تصدير الاتصال لبقية الملفات
