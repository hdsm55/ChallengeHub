import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dot bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white font-sans">
      <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 text-sm sm:text-base gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold whitespace-nowrap">
          <span className="text-cyan-400">Challenge</span>
          <span className="text-purple-300">Hub</span>
        </h1>

        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 items-center">
          <Link to="/challenges" className="hover:underline whitespace-nowrap">
            التحديات
          </Link>

          {user && (
            <Link to="/add" className="hover:underline whitespace-nowrap">
              أضف تحدي
            </Link>
          )}

          {user ? (
            <button
              onClick={() => {
                logout();
                toast.success('👋 تم تسجيل الخروج بنجاح');
                navigate('/login'); // إعادة توجيه بعد الخروج
              }}
              className="hover:underline whitespace-nowrap"
            >
              تسجيل الخروج
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:underline whitespace-nowrap">
                دخول
              </Link>
              <Link
                to="/register"
                className="hover:underline whitespace-nowrap"
              >
                حساب جديد
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="px-4 sm:px-6 py-6 w-full max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
