import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import * as userService from './user-service.js';

dotenv.config();

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const register = async (name, email, password) => {
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists with this email');
    }
    const hashedPassword = await hashPassword(password);

    const user = await userService.createUser(name, email, hashedPassword);
    
    const token = generateToken(user.id);
    
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at
        },
        token
    };
};

const login = async (email, password) => {
    const user = await userService.findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id);
    
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at
        },
        token
    };
};

const getAuthUser = async (userId) => {
    return await userService.findUserById(userId);
};

export {
    generateToken,
    verifyToken,
    hashPassword,
    comparePasswords,
    register,
    login,
    getAuthUser
};