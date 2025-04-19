import express from 'express';
import {
  AddImageHandler,
  createProductHandler,
  deleteProductHandler,
  reviewProductHandler,
  updateProductHandler,
  getAllProductsHandler,
  getProductByNameAndSizeHandler,
  getProductByIdHandler
} from '../controllers/productController.mjs';
import { authorizeRoles, protect } from '../middleware/authMiddleware.mjs';
import { validateCreateProduct, validateImage, validateReviewProduct, validateUpdateProduct } from '../middleware/validators/productValidator.mjs';

const router = express.Router();

router.get('/', getAllProductsHandler);
router.post('/add', protect, authorizeRoles('admin'), validateCreateProduct, createProductHandler);
router.patch('/review/:id', protect, authorizeRoles('customer'), validateReviewProduct, reviewProductHandler);

// router.get('/:name', getProductByNameAndSizeHandler);

router.route('/:id')
  .get(getProductByIdHandler)
  .put(protect, authorizeRoles('admin'), validateUpdateProduct, updateProductHandler)
  .delete(protect, authorizeRoles('admin'), deleteProductHandler)
  .patch(protect, authorizeRoles('admin'), validateImage, AddImageHandler);

export default router;