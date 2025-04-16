import express from 'express';
import validateCart from '../middleware/validators/cartValidator.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import { addToCart, getUserCart, removeCart, removeCartItem, updateItemQuantity } from '../controllers/cartController.mjs';

const router = express.Router();

router.post('/add', protect, authorizeRoles('customer'), validateCart, addToCart);
router.delete('/:productId', protect, authorizeRoles('customer'), removeCartItem);
router.route('/', protect, authorizeRoles('customer')).delete(removeCart).get(getUserCart);
router.patch('/update', protect, authorizeRoles('customer'), validateCart, updateItemQuantity);

export default router;