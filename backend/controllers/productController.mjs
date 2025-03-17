import Product from '../models/productModel.mjs';
import { deleteOneDoc, getAllDocs, updateOneDoc } from "../services/crudHandlerFactory.mjs";
import { addReviewHandler, createHandler, getByIdOrNameHandler } from "../services/productService.mjs";

export const createProduct = createHandler(Product);
export const getAllProducts = getAllDocs(Product);
export const getProductById = getByIdOrNameHandler(Product);
export const deleteProduct = deleteOneDoc(Product);
export const updateProduct = updateOneDoc(Product);
export const reviewProduct = addReviewHandler(Product);

/*export const deactivateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });

  if (product) {
    product.isActive = req.body.isActive || product.isActive;

    const updatedProduct = await product.save();

    res.status(OK).json({
      success: true,
      message: `Product updated successfully`,
      results: updatedProduct
    });
  } else {
    throw new HttpError('Product not found', NOT_FOUND);
  }
});

export const AddImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { image } = req.body;

  if (!image) {
    res.status(400);
    throw new Error('Missing information');
  }

  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      $push: {
        image
      }
    },
    { new: true, runValidators: true }
  );


  if (!updateProduct) {
    throw new HttpError('Product not found', NOT_FOUND);
  }

  res.status(201).json({
    success: true,
    message: `Image added successfully`,
    results: updateProduct
  });
});
*/