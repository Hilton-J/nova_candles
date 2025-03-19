import express from 'express';
import { addToCart, getUserCart, removeCart, removeCartItem, updateItemQuantity } from '../controllers/cartController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import validateCart from '../middleware/validators/cartValidator.mjs';


const router = express.Router();

router.route('/')
  .delete(protect, removeCart)
  .get(protect, authorizeRoles('customer'), getUserCart);
router.post('/add', protect, authorizeRoles('customer'), validateCart, addToCart);
router.delete('/:productId', protect, authorizeRoles('customer'), removeCartItem);
router.patch('/update', protect, authorizeRoles('customer'), validateCart, updateItemQuantity);

export default router;