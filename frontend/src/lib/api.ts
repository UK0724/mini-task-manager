import axios from "axios";
import type { LoginCredentials, RegisterCredentials, Task, UpdateTask } from "../types";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        throw error;
    }
)

export const taskApi = {
    getTasks: () => api.get("/tasks"),
    createTask: (task: Task) => api.post("/tasks", task),
    updateTask: (id: string, task: UpdateTask) => api.put(`/tasks/${id}`, task),
    deleteTask: (id: string) => api.delete(`/tasks/${id}`),
}

export const authApi = {
    login: (credentials: LoginCredentials) => api.post("/auth/login", credentials),
    register: (credentials: RegisterCredentials) => api.post("/auth/register", credentials),
    getMe: () => api.get("/auth/getme"),
    logout: () => api.post("/auth/logout"),
}

export default api;

