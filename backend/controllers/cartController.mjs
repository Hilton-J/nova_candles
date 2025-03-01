import Cart from '../models/cartModel.mjs';
import Product from '../models/productModel.mjs';
import asyncHandler from 'express-async-handler';

// @desc    Add to Cart
// route    POST /api/cart/add
// @access  Private
// export const addToCart = asyncHandler(async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user._id;

//   const product = await Product.findById(productId);
//   if (!product) {
//     res.status(404);
//     throw new Error('Product not found')
//   }

//   const cart = await Cart.findOne({ user: userId });

//   //Check if the user has an existing cart
//   if (cart) {
//     const existingItem = cart.items.find(
//       item => item.productId.toString() === productId
//     );

//     //Check if the item existing in the cart. If not, add into the cart
//     if (existingItem) {
//       existingItem.quantity += Number(quantity);
//     } else {
//       cart.items.push({
//         productId,
//         quantity
//       })
//     }

//     cart.totalPrice = cart.items.reduce((acc, item) => {
//       return acc + (product.price * item.quantity);
//     }, 0);

//     await cart.save();

//     res.status(200).json({
//       success: true,
//       message: 'Cart updated',
//       results: cart
//     })
//   } else {
//     const totalPrice = product.price * quantity;
//     const createCart = await Cart.create({
//       user: userId,
//       items: [{ productId, quantity }],
//       totalPrice
//     });

//     if (createCart) {
//       res.status(201).json({
//         success: true,
//         message: 'Cart Created',
//         results: createCart
//       })
//     } else {
//       res.status(500);
//       throw new Error('Error creating cart');
//     }
//   }
// });
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Update existing cart or create a new one
  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId, "items.productId": productId }, // Check if cart exists and product is already in cart
    {
      $inc: { "items.$.quantity": quantity, totalPrice: product.price * quantity }, // Increment quantity if found
    },
    { new: true }
  );

  if (!updatedCart) {
    // If product was not in cart, add it to items array
    const newCart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $push: { items: { productId, quantity } }, // Add new product to cart
        $inc: { totalPrice: product.price * quantity },
        $setOnInsert: { user: userId }, // Set user if cart is newly created
      },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Cart Created",
      results: newCart,
    });
  }

  return res.status(201).json({
    success: true,
    message: "Cart updated",
    results: updatedCart,
  });
});


// @desc    GET User's Cart
// route    Get /api/cart
// @access  Private
export const getUserCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const userCart = await Cart.findOne({ user: userId })
    .populate({ path: 'items.productId', select: 'productName price images' });

  if (userCart) {
    res.status(201).json(userCart);
  } else {
    res.status(404);
    throw Error('No cart for this user')
  }
});

// @desc    DELETE User's Cart
// route    DELETE /api/cart
// @access  Private
export const removeCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOneAndDelete({ user: userId });

  if (cart) {
    res.status(201).json(userCart);
  } else {
    res.status(404);
    throw Error('No cart for this user')
  }
});

