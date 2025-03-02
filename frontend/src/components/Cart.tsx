import Drawer from "react-modern-drawer";
import { CartProps } from "../interfaces/interfaces";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router";

const Cart = ({ openCart, toggleDrawer, cart }: CartProps) => {
  return (
    <Drawer
      open={openCart}
      onClose={toggleDrawer}
      direction='right'
      className='h-screen'
    >
      <h1 className='p-2'>Shopping Bag</h1>
      <hr className='text-black/20' />
      {cart?.items?.length ? (
        <div className='space-y-4 h-full flex flex-col'>
          {cart.items.map((item, index) => (
            <div
              key={index}
              className='flex gap-4 items-center border-b border-black/20 py-3 px-2'
            >
              {/* Product Image */}
              <img
                src={item.productId?.images?.[0] || "/placeholder.png"}
                alt={item.productId?.productName || "Product Image"}
                className='size-12 object-cover rounded'
              />

              {/* Product Details */}
              <div className='flex-1 text-[0.8rem]'>
                <div className='flex justify-between items-center'>
                  <Link
                    to={`/products/${item.productId?.productName}/${item.productId?.size}`}
                  >
                    <p className='text-[0.8rem] font-medium'>
                      {item.productId?.productName}
                    </p>
                  </Link>
                  <RiDeleteBin5Line className='text-red-500 cursor-pointer hover:text-red-700' />
                </div>

                <div className='flex justify-between text-gray-600'>
                  <p>Qty: {item.quantity}</p>
                  <p className='font-semibold'>
                    R{(item.productId?.price || 0) * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <p className='border-y border-black/20 pr-2 flex justify-end py-2'>
            Total: R{cart.totalPrice.toFixed(2)}
          </p>
        </div>
      ) : (
        <p className='text-gray-500 text-center py-3'>Your cart is empty.</p>
      )}
    </Drawer>
  );
};

export default Cart;
