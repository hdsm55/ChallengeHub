import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// 👇 المزوّد الرئيسي الذي نلف به التطبيق
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // بيانات المستخدم
  const [token, setToken] = useState(null); // التوكن

  // عند أول تحميل للتطبيق، نحاول استعادة بيانات الدخول من localStorage
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        }
    }, []);

    // تسجيل دخول: تخزين التوكن والمستخدم
    const login = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    // تسجيل خروج: مسح كل شيء
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    };

// ⚡ استخدم هذا في أي مكان تحتاج فيه الوصول للمستخدم
export const useAuth = () => useContext(AuthContext);
