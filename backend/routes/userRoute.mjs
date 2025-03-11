import express from 'express';
import { registerHandler, login, getAllUsers, logout, getUserById, deleteUser, updateUser } from '../controllers/userController.mjs';
import { protect, authorizeRoles } from '../middleware/authMiddleware.mjs'
import validateLogin from '../middleware/validators/validateLogin.mjs';
import validateRegister from '../middleware/validators/validateRegister.mjs';

const router = express.Router();

router.post('/register', validateRegister, registerHandler);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.route('/profile').get(protect, getUserById).put(protect, updateUser);
router.get('/', protect, authorizeRoles('admin'), getAllUsers);
// router.patch('/cart/:id', protect, authorizeRoles('customer'), addCart);
router.delete('/:id', protect, deleteUser);

export default router;
