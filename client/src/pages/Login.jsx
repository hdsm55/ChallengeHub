// 🚀 واجهة تسجيل دخول خرافية عالية الإبداع + تحسينات جمالية باستخدام Tailwind و Toast و Framer Motion
import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      toast.success('✅ تم تسجيل الدخول بنجاح');
      setTimeout(() => navigate('/challenges'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'حدث خطأ غير متوقع');
      toast.error('❌ فشل في تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* خلفيات متوهجة متحركة */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-[600px] h-[600px] bg-purple-500 opacity-20 rounded-full top-[-200px] left-[-200px] blur-[150px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500 opacity-10 rounded-full bottom-[-100px] right-[-100px] blur-[120px] animate-ping"></div>
        <div className="absolute w-[300px] h-[300px] bg-pink-600 opacity-10 rounded-full bottom-[100px] left-[200px] blur-[100px] animate-pulse"></div>
      </div>

      <div className="z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 tracking-tight leading-tight flex items-center justify-center gap-2">
          <svg
            className="w-8 h-8 text-blue-400 animate-bounce"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            ChallengeHub Login
          </span>
        </h1>

        {error && (
          <p className="text-red-400 mb-4 text-center font-semibold tracking-wide animate-shake">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-white/90">
              📧 البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-white/90">
              🔒 كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/30 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? '🚀 جاري التحقق...' : '🚀 دخول إلى المنصة'}
          </button>
        </form>

        <p className="text-center text-sm text-white/60 mt-6">
          لا تملك حسابًا؟{' '}
          <a
            href="/register"
            className="text-blue-300 hover:underline font-semibold"
          >
            أنشئ حسابًا جديدًا
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
