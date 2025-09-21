export interface Task{
    _id: string;
    title: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    user: string;
}

export interface User{
    _id: string;
    name: string;
    email: string;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials{
    name: string;
}

export interface UpdateTask{
    title?: string;
    description?: string;
    status?: boolean;
}

export interface AuthContextType{
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

    