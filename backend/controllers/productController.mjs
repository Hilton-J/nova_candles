import asyncHandler from "express-async-handler";
import Product from '../models/productModel.mjs';

// @dsc     Add Product
// route    POST /api/products
// @access  Private
export const createProduct = asyncHandler(async (req, res) => {
  const { productName, description, price, size, stock, type } = req.body;

  const product = await Product.create({
    productName,
    description,
    price,
    size,
    stock,
    type
  });

  if (product) {
    res.status(201).json({
      success: true,
      message: 'Product added successfully'
    })
  } else {
    res.status(400);
    throw new Error('Invalid procuct data')
  }
});

// @dsc     Get product
// route    GET /api/products
// @access  Public
export const getAllProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const skip = (page - 1) * limit;

  const products = await Product.find({})
    .skip(skip)
    .limit(limit);

  const totalResults = await Product.countDocuments();

  if (products.length > 0) {
    res.status(201).json({
      page,
      results: products,
      totalPages: Math.ceil(totalResults / limit),
      totalResults
    });
  } else {
    res.status(400);
    throw new Error('No products found');
  }
});

// @dsc     Get Product by ID
// route    GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (product) {
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @dsc     Update Product
// route    PUT /api/products/add
// @access  Private (admin only)
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });

  if (product) {
    product.productName = req.body.productName || product.productName;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.size = req.body.size || product.size;
    product.stock = req.body.stock || product.stock;
    product.type = req.body.type || product.type;
    product.images = req.body.gallery || product.images;

    const updatedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: `Product updated successfully`,
      results: updatedProduct
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @dsc     Delete Product
// route    DELETE /api/products/:id
// @access  Private (admin only)
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (product) {
    res.status(201).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } else {
    res.status(404);
    throw new Error('Product not found')
  }
});

// @dsc     Deactivate Product
// route    PATCH /api/products/:id
// @access  Private (admin only)
export const deactivateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });

  if (product) {
    product.isActive = req.body.isActive || product.isActive;

    const updatedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: `Product updated successfully`,
      results: updatedProduct
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @dsc     Review Product
// route    PATCH /api/products/:id
// @access  Private (admin only)
export const reviewProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const user = req.user;

  if (!rating || !comment) {
    res.status(400);
    throw new Error('Missing information');
  }

  //Finds and check if the user already reviewed
  const product = await Product.findOne({
    _id: id,
    'reviews.userId': user._id
  });
  
  if (product) {
    res.status(400);
    throw new Error('Product already reviewed by this user')
  }

  const updateProduct = await Product.findByIdAndUpdate(
    id,
    {
      $push: {
        reviews: {
          userId: user._id,
          rating,
          comment,
          date: new Date()
        }
      }
    },
    { new: true, runValidators: true }
  );
  if (updateProduct) {
    // product.reviews.userId = user._id || product.reviews.userId;
    // product.reviews.rating = rating || product.reviews.rating;
    // product.reviews.comment = comment || product.reviews.comment;

    // const updatedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: `Review added successfully`,
      results: updateProduct
    });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});
