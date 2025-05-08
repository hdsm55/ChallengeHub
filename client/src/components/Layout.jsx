import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-dot bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h1 className="text-2xl font-bold">
          <span className="text-cyan-400">Challenge</span>
          <span className="text-purple-300">Hub</span>
        </h1>

        <nav className="flex gap-6 items-center">
          <Link to="/challenges" className="hover:underline">
            🧠 التحديات
          </Link>
          {user && (
            <Link to="/add" className="hover:underline">
              ➕ أضف تحدي
            </Link>
          )}
          {user ? (
            <button onClick={logout} className="hover:underline">
              🚪 تسجيل الخروج
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                🔐 دخول
              </Link>
              <Link to="/register" className="hover:underline">
                🆕 حساب جديد
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="p-6">
        <Outlet /> {/* ← هنا يتم عرض الصفحات الفرعية */}
      </main>
    </div>
  );
}

export default Layout;
