import express from 'express';
import { 
    getUserProfile,
    updateUserProfile,
    deleteUserAccount
 } from '../controllers/userController.js'

import requireAuth from '../middleware/requireAuth';

const router = express.Router();


router.use(requireAuth); // All routes below require auth

router.get('/me', getUserProfile);
router.put('/me', updateUserProfile);
router.delete('/me', deleteUserAccount);

export default router
