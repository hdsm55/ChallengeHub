import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await api.post("/users", {
        username,
        email,
        password,
    });

    // بعد نجاح التسجيل: سجل دخول المستخدم تلقائيًا
    login(response.data.token, response.data.user);
    navigate("/challenges"); // توجهه مباشرة للوحة التحديات

    } catch (err) {
    setError(err.response?.data?.error || "حدث خطأ أثناء التسجيل");
    }
};

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto", padding: "2rem", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>إنشاء حساب جديد</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label>اسم المستخدم</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
            <label>البريد الإلكتروني</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
            <label>كلمة المرور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">تسجيل</button>
        </form>
        </div>
    );
    }

    export default Register;
