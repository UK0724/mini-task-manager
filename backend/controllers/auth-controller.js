import { register, login, getAuthUser } from '../services/auth-service.js';

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("5", name, email, password)
    if (!name || !email || !password) {
        return res.status(400).json({ 
            message: 'All fields are required', 
            success: false 
        });
    }

    try {
        const { user, token } = await register(name, email, password);
        
        res.status(201).json({ 
            message: 'User registered successfully', 
            success: true, 
            data: {
                user,
                accessToken: token
            } 
        });
    } catch (error) {
        res.status(400).json({ 
            message: error.message || 'Registration failed', 
            success: false 
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email and password are required', 
            success: false 
        });
    }

    try {

        const { user, token } = await login(email, password);

        
        res.status(200).json({ 
            message: 'Login successful', 
            success: true, 
            data: {
                user,
                accessToken: token
            } 
        });
    } catch (error) {
        res.status(401).json({ 
            message: error.message || 'Invalid credentials', 
            success: false 
        });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await getAuthUser(req.user.id);
        
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found', 
                success: false 
            });
        }
        
        res.status(200).json({ 
            message: 'User profile retrieved successfully', 
            success: true, 
            data: user 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching user profile', 
            success: false,
            error: error.message 
        });
    }
};

export { registerUser, loginUser, getMe };