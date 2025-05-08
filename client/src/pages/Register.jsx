import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users', { username, email, password });
      toast.success('✅ تم التسجيل بنجاح، يمكنك تسجيل الدخول الآن');
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'حدث خطأ أثناء التسجيل';
      if (errorMessage.includes('مسجّل')) {
        toast('📬 البريد مسجل مسبقًا، تم تحويلك لتسجيل الدخول');
        navigate('/login');
      }
      // ✅ إذا كان البريد مسجلاً مسبقًا → نوجهه لتسجيل الدخول
      if (
        errorMessage.toLowerCase().includes('already') ||
        errorMessage.includes('exists')
      ) {
        toast('📬 البريد مسجل مسبقًا، تم تحويلك لتسجيل الدخول');
        navigate('/login');
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-8 rounded-xl shadow-lg w-full max-w-md text-white space-y-4"
      >
        <h2 className="text-3xl font-bold text-purple-300 text-center mb-6">
          🧑‍💻 تسجيل مستخدم جديد
        </h2>

        <div>
          <label className="block mb-1">👤 اسم المستخدم</label>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-white/10 text-white"
            placeholder="اسمك"
          />
        </div>

        <div>
          <label className="block mb-1">📧 البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-white/10 text-white"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1">🔒 كلمة المرور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-white/10 text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded font-bold hover:scale-[1.02] transition"
        >
          {loading ? '📩 جارٍ التسجيل...' : '✅ سجل الآن'}
        </button>
        <p className="text-sm mt-4 text-gray-400 text-center">
          لديك حساب؟{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
