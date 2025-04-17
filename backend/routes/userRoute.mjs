import express from 'express';
import validateLogin from '../middleware/validators/validateLogin.mjs';
import { protect, authorizeRoles } from '../middleware/authMiddleware.mjs';
import validateRegister from '../middleware/validators/validateRegister.mjs';
import { registerHandler, login, getAllUsers, logout, getUserById, deleteUser, updateUser, addAddressHandler } from '../controllers/userController.mjs';
import { validateShippingAddress, validateUpdateUser } from '../middleware/validators/userValidator.mjs';

const router = express.Router();

router.post('/logout', logout);
router.post('/login', validateLogin, login);
router.post('/register', validateRegister, registerHandler);

router.route('/profile')
  .get(protect, getUserById)
  .put(protect, validateUpdateUser, updateUser);

router.get('/', protect, authorizeRoles('admin'), getAllUsers);
router.delete('/:id', protect, deleteUser);

router.put(
  '/address/add',
  protect,
  authorizeRoles('customer'),
  validateShippingAddress,
  addAddressHandler);

export default router;