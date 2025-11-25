import express from 'express';
import { registerUser } from '../controllers/user_controller';
import { loginUser } from '../controllers/user_controller';
import { getUserData } from '../controllers/user_controller';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getResumeData } from '../controllers/user_controller'; 


const userRoutes = express.Router();

userRoutes.post('/register', registerUser);

userRoutes.post('/login', loginUser);

userRoutes.get('/data', authMiddleware, getUserData);

userRoutes.get('/resume', authMiddleware, getResumeData);

export default userRoutes;