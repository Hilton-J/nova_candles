import express from 'express';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import validateOrderPlacement from '../middleware/validators/orderValidator.mjs';
import { deleteOrder, getAllOrders, getOrdersByCustomer, placeOrder } from '../controllers/orderController.mjs';

const router = express.Router();

router.route('/', protect)
  .post(authorizeRoles('customer'), validateOrderPlacement, placeOrder)
  .get(authorizeRoles('admin'), getAllOrders);
router.delete('/:id', protect, authorizeRoles('admin'), deleteOrder);
router.get('/customer', protect, getOrdersByCustomer);

export default router;