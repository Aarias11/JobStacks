import express from 'express';
import {
    registerUser,
    loginUser,
    getCurrentUser,
    refreshAccessToken,
    logoutUser
} from '../controllers/authController.js'

import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);

// Frontend Reminder (when calling protected routes):
// axios.get('/api/users/me', {
//   withCredentials: true // 👈 This is key for cookies
// });

// Protected Route
router.get('/me', requireAuth, getCurrentUser)

router.post('/logout', logoutUser);


export default router;