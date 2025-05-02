import { Link } from "react-router";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useGetUserCartQuery } from "../slices/cartApiSlice";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
// import { useState } from "react";

const CartPage = () => {
  // const [quantity, setQuantity] = useState(1);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { data: cart } = useGetUserCartQuery(userInfo ? undefined : skipToken);

  // console.log(cart);
  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='font-serif text-3xl font-medium text-candledark mb-8 text-center'>
        Your Cart
      </h1>

      {!cart?.items.length ? (
        <div className='text-center py-16'>
          <div className='flex justify-center mb-6'>
            <ShoppingBag className='h-20 w-20 text-candlegray' />
          </div>
          <h2 className='font-serif text-2xl font-medium text-candledark mb-4'>
            Your cart is empty
          </h2>
          <p className='text-candlegray mb-8'>
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to='/shop'
            className='inline-flex items-center justify-center px-6 py-3 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors'
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-8'>
            <div className='bg-white rounded-lg border border-border overflow-hidden'>
              <div className='hidden md:grid grid-cols-12 p-4 border-b border-border bg-secondary text-sm font-medium text-candledark'>
                <div className='col-span-6'>Product</div>
                <div className='col-span-2 text-center'>Price</div>
                <div className='col-span-2 text-center'>Quantity</div>
                <div className='col-span-2 text-right'>Total</div>
              </div>

              <div className='divide-y divide-border'>
                {cart?.items.map((item) => {
                  const itemTotal = item.price * item.quantity;
                  return (
                    <div key={`${item.productId}`} className='p-4'>
                      <div className='md:grid grid-cols-12 gap-4 items-center'>
                        {/* Product Info (Mobile & Desktop) */}
                        <div className='col-span-6'>
                          <div className='flex items-center'>
                            <img
                              src={item.image}
                              alt={item.productName}
                              className='w-20 h-20 object-cover rounded-md'
                            />
                            <div className='ml-4'>
                              <h3 className='capitalize font-medium text-candledark'>
                                {item.productName}
                              </h3>
                              <p className='text-candlegray text-sm capitalize'>
                                {item.fragrance}
                              </p>
                              {item.size && (
                                <p className='text-candlegray text-sm capitalize'>
                                  Size: {item.size}
                                </p>
                              )}
                              {/* Mobile Only Price */}
                              <p className='md:hidden text-candleamber font-medium mt-2'>
                                R{item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Price (Desktop Only) */}
                        <div className='hidden md:block col-span-2 text-center'>
                          R{item.price.toFixed(2)}
                        </div>

                        {/* Quantity */}
                        <div className='col-span-2 flex items-center justify-center md:justify-center mt-4 md:mt-0'>
                          <div className='flex items-center'>
                            <button
                              // onClick={() =>
                              //   updateQuantity(
                              //     item.productId,
                              //     item.quantity - 1,
                              //     item.size
                              //   )
                              // }
                              className='w-8 h-8 border border-border rounded-l-md flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer'
                            >
                              <Minus className='h-3 w-3' />
                            </button>
                            <input
                              type='number'
                              min='1'
                              max='10'
                              value={item.quantity}
                              // onChange={(e) =>
                              //   updateQuantity(
                              //     item.productId,
                              //     parseInt(e.target.value) || 1,
                              //     item.size
                              //   )
                              // }
                              className='w-10 h-8 border-y border-border text-center focus:outline-none focus:border-candleamber text-sm'
                            />
                            <button
                              // onClick={() =>
                              //   updateQuantity(
                              //     item.productId,
                              //     item.quantity + 1,
                              //     item.size
                              //   )
                              // }
                              className='w-8 h-8 border border-border rounded-r-md flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer'
                            >
                              <Plus className='h-3 w-3' />
                            </button>
                          </div>
                        </div>

                        {/* Total & Remove (Desktop) */}
                        <div className='col-span-2 text-right hidden md:block'>
                          <div className='font-medium text-candledark'>
                            R{itemTotal.toFixed(2)}
                          </div>
                        </div>

                        {/* Mobile Total & Remove */}
                        <div className='md:hidden flex justify-between items-center mt-4'>
                          <div className='font-medium text-candledark'>
                            Total: R{itemTotal.toFixed(2)}
                          </div>
                          <button
                            // onClick={() =>
                            //   removeFromCart(item.productId, item.size)
                            // }
                            className='text-candlegray hover:text-red-500 transition-colors cursor-pointer'
                          >
                            <Trash2 className='h-5 w-5' />
                          </button>
                        </div>

                        {/* Remove Button (Desktop) */}
                        <div className='hidden md:flex justify-end'>
                          <button
                            // onClick={() =>
                            //   removeFromCart(item.productId, item.size)
                            // }
                            className='text-candlegray hover:text-red-500 transition-colors cursor-pointer'
                          >
                            <Trash2 className='h-5 w-5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='mt-8'>
              <Link
                to='/shop'
                className='text-candleamber hover:underline inline-flex items-center'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-4'>
            <div className='bg-white rounded-lg border border-border p-6'>
              <h2 className='font-serif text-xl font-medium text-candledark mb-6'>
                Order Summary
              </h2>

              <div className='space-y-3 mb-6'>
                <div className='flex justify-between'>
                  <span className='text-candlegray'>Subtotal</span>
                  <span className='font-medium text-candledark'>
                    R{cart.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-candlegray'>Shipping</span>
                  <span className='font-medium text-candledark'>
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className='border-t border-border pt-4 mb-6'>
                <div className='flex justify-between'>
                  <span className='font-medium text-candledark'>Total</span>
                  <span className='font-medium text-xl text-candledark'>
                    R{cart.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className='w-full py-3 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors mb-4 cursor-pointer'>
                Proceed to Checkout
              </button>

              <p className='text-xs text-center text-candlegray'>
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
