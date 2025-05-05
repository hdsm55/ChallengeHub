import { useState } from 'react';
import api from '../api/axios'; // استدعاء axios المخصص
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate من react-router-dom
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // استخدام useNavigate للتوجيه

  const handleSubmit = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // حفظ التوكن في localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/challenges'); // ← بعد حفظ التوكن مباشرة

      // إعادة التوجيه لاحقًا (سنضيف React Router)
      alert('تم تسجيل الدخول بنجاح ✅');
    } catch (err) {
      setError(err.response?.data?.error || 'حدث خطأ غير متوقع');
    }
  };
  console.log('تم الضغط على تسجيل الدخول');
  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
      <h2>تسجيل الدخول</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>البريد الإلكتروني</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>كلمة المرور</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">دخول</button>
      </form>
    </div>
  );
}

export default Login;
