import axios from "axios";

// Create a custom instance of Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // Change it later if the server is deployed
    headers: {
        "Content-Type": "application/json",
    },
    });

    // Automatically add the token if it exists (for future use)
    api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    });

export default api;
