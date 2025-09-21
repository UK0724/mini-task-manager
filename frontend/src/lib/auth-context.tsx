import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, LoginCredentials, RegisterCredentials, User } from "../types";
import { authApi } from "./api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if(userData){
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            setLoading(true);
            const { data } = await authApi.login(credentials);
            localStorage.setItem("token", data.data.accessToken);
            console.log(data)
            const user = await authApi.getMe();
            localStorage.setItem("user", JSON.stringify(user.data.data));
            console.log(user)
            setUser(user.data.data);
            setLoading(false);  
            navigate("/");
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed')
            setLoading(false);
            throw error        
        }
    }

    const register = async ({ name, email, password }: RegisterCredentials) => {
        try {
            setLoading(true);
            await authApi.register({ name, email, password })
            await login({ email, password })
            toast.success('Account created successfully')
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Registration failed', {
                duration: 5000,
                position: "bottom-center"
            })
            setLoading(false);
            throw error
        }
        }

    const logout = async () => {
        try {
            setUser(null);
            setLoading(false);
            navigate("/login");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider 
        value={{
            user,
            login,
            register,
            logout,
            loading,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}