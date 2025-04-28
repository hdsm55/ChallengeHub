
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // استيراد السياق الخاص بالمستخدم
import Login from './pages/Login'; // صفحة تسجيل الدخول
import Register from "./pages/Register"; // ← أضف هذا الاستيراد
import Challenges from './pages/Challenges'; // ← أضف هذا الاستيراد لاحقًا

// لاحقًا نضيف Register و Challenges

function App() {
  const { user } = useAuth();
  console.log(user); // Log the user to use the variable and avoid the error

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* صفحة التسجيل */}
        {/* هنا نضيف لاحقًا صفحة التحديات */}
          <Route path="/challenges" element={<Challenges />} />

        {/* إذا كان المستخدم مسجل دخول، يمكنه الوصول إلى صفحة التحديات */}
        {/* <Route path="/challenges" element={user ? <Challenges /> : <Navigate to="/login" replace />} /> */}
        {/* هنا نضيف لاحقًا الصفحات المحمية بعد تسجيل الدخول */}

        {/* إعادة توجيه: لو دخل المستخدم مسار غير موجود */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
