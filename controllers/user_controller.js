import User from '../models/user_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { message } from 'statuses';


// Utility function to generate a random token
export const generateToken = (userId) => {
    const token = jwt.sign({userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

//post: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    // Check if user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

    // Generate token
    const token = generateToken(newUser._id);
    newUser.password = undefined; // Hide password in response
    res.status(201).json({ message : "User registered successfully", user: newUser, token });


  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
}};



//post: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);

    // Check if password matches
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Generate token
    const token = generateToken(user._id);
    user.password = undefined; // Hide password in response
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
}};


//get: /api/users/data
export const getUserData = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set in req by auth middleware
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }  
    user.password = undefined; // Just to be safe 
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
}};


//controller for getting resume
export const getResumeData = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set in req by auth middleware
    const { resumeId , resumeData , removeBackground } = req.body;
    const image = req.file;
    let resumeDataCopy  = JSON.parse(resumeData);
    const resume = await Resume.findByIdAndUpdate(
      { _id: resumeId, userId },
      { $set: resumeDataCopy }, { new: true }
    );
    return res.status(200).json({ resume });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
};
};

