import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);
      toast.success(`👋 أهلًا ${res.data.user.username}، تم تسجيل الدخول`);
      navigate('/challenges');
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'فشل تسجيل الدخول';
      if (
        errorMessage.toLowerCase().includes('invalid') ||
        errorMessage.includes('كلمة المرور')
      ) {
        toast.error('❌ البريد أو كلمة المرور غير صحيحة');
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-xl w-full max-w-md shadow-lg backdrop-blur text-white"
      >
        <h2 className="text-center text-2xl font-bold mb-6 text-purple-300">
          تسجيل الدخول إلى ChallengeHub
        </h2>

        <label className="block mb-2">📧 البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder:text-white/60"
          placeholder="you@example.com"
        />

        <label className="block mb-2">🔒 كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 rounded bg-white/20 text-white placeholder:text-white/60"
          placeholder="••••••••"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded text-white font-bold mt-2 hover:scale-[1.02] transition"
        >
          🚀 دخول إلى المنصة
        </button>

        <p className="text-sm mt-4 text-gray-400 text-center">
          لا تملك حساب؟{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            سجل الآن
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
