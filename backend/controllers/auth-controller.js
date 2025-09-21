import User from "../models/user-model.js";
import { generateToken } from "../services/auth-service.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
    const {
        name, 
        email, 
        password
    } = req.body

    if(!name || !email || !password){
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });

    if(user){
        return res.status(400).json({ message: "User already exists", success: false });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });
    
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully", success: true, data: {
        accessToken: generateToken(newUser),
    } });
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "All fields are required", success: false });
    }
    
    const user = await User.findOne({ email });

    if(!user){
        return res.status(400).json({ message: "User not found", success: false });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({ message: "Invalid password", success: false });
    }

    res.status(200).json({ message: "User logged in successfully", success: true, data: {
        accessToken: generateToken(user),
    } });
}

const getMe = async (req, res) => {

    const user = await User.findById(req.user.id);

    if(!user){
        return res.status(400).json({ message: "User not found", success: false });
    }
    
    res.status(200).json({ message: "User fetched successfully", success: true, data: user });
}

export { registerUser, loginUser, getMe }