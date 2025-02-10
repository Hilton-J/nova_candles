import express from 'express';
import { registerUser, login, getAllUsers, logout, getUserById } from '../controllers/userController.mjs';
import { protect, authorizeRoles } from '../middleware/authMiddleware.mjs'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/:id', protect, getUserById);
router.get('/', protect, authorizeRoles('admin'), getAllUsers)

export default router;