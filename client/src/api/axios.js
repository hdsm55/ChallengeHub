import axios from "axios";

// أنشئ نسخة مخصصة من Axios
const api = axios.create({
    baseURL: "http://localhost:5000", // غيّرها لاحقًا لو رفعت السيرفر
    headers: {
        "Content-Type": "application/json",
    },
    });

    // إضافة التوكن تلقائيًا إن وجد (للمستقبل)
    api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    });

export default api;
