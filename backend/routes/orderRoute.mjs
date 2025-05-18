import express from 'express';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import validateOrderPlacement from '../middleware/validators/orderValidator.mjs';
import { deleteOrderHandler, getAllOrdersHandler, getOrderByIdHandler, getOrdersByCustomerHandler, placeOrderHandler } from '../controllers/orderController.mjs';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('customer'), validateOrderPlacement, placeOrderHandler)
  .get(protect, authorizeRoles('admin'), getAllOrdersHandler);
router.get('/customer', protect, getOrdersByCustomerHandler);
router.delete('/:id', protect, authorizeRoles('admin'), deleteOrderHandler);
router.get('/:id', protect, getOrderByIdHandler);

export default router;