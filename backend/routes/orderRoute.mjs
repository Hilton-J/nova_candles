import express from 'express';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import validateOrderPlacement from '../middleware/validators/orderValidator.mjs';
import { deleteOrderHandler, getAllOrdersHandler, getOrdersByCustomerHandler, placeOrderHandler } from '../controllers/orderController.mjs';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('customer'), validateOrderPlacement, placeOrderHandler)
  .get(protect, authorizeRoles('admin'), getAllOrdersHandler);
router.delete('/:id', protect, authorizeRoles('admin'), deleteOrderHandler);
router.get('/customer', protect, getOrdersByCustomerHandler);

export default router;