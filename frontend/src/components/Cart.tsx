// import Drawer from "react-modern-drawer";
import { CartProps } from "../interfaces/interfaces";
import { RiDeleteBin5Line, RiCloseFill } from "react-icons/ri";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";
import { Link } from "react-router";
import {
  useRemoveCartItemMutation,
  useUpdateItemQuantityMutation,
} from "../slices/cartApiSlice";
import { toast } from "react-toastify";

const Cart = ({ toggleDrawer, cart }: CartProps) => {
  
  const [removeItem] = useRemoveCartItemMutation();
  const [updateQuantity] = useUpdateItemQuantityMutation();
  // const [removeItem, {isLoading: loadingRemoveItem}] = useRemoveCartItemMutation();
  // const [updateQuantity, {isLoading:loadingQuantityChange}] = useUpdateItemQuantityMutation();
  // Handle Quantity Update
  //TODO: Utalise this method
  const handleQuantityChange = async (
    productId: string = "",
    newQuantity: number
  ) => {
    if (newQuantity < 1) return; // Prevent zero or negative quantities
    try {
      await updateQuantity({ productId, quantity: newQuantity }).unwrap();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      if (err && typeof err === "object" && "data" in err) {
        toast.error((err as { data: { message: string } }).data.message);
      } else {
        toast.error(`An unexpected error occurred: ${err}`);
      }
    }
  };

  // Handle Remove Item
  const handlesRemoveItem = async (productId: string) => {
    try {
      await removeItem(productId).unwrap();
      toast.success("Item removed");
    } catch (err) {
      if (err && typeof err === "object" && "data" in err) {
        toast.error((err as { data: { message: string } }).data.message);
      } else {
        toast.error(`An unexpected error occurred: ${err}`);
      }
    }
  };

  return (
    <div
      className={`h-screen fixed bg-secondary right-0 top-0 w-96 transform translate-x-0 transition-transform duration-700 flex flex-col text-xl`}
    >
      <div className='flex items-center justify-between p-2 text-2xl'>
        <h1>Cart</h1>
        <RiCloseFill
          className='hover:text-accent cursor-pointer'
          onClick={toggleDrawer}
        />
      </div>
      <hr className='text-black/20' />
      {cart?.items?.length ? (
        <div className='space-y-4 flex flex-col'>
          {cart.items.map((item, index) => (
            <div
              key={index}
              className='flex gap-4 items-center border-b border-black/20 py-3 px-2'
            >
              {/* Product Image */}
              <img
                src={item.productId?.images?.[0] || "/placeholder.png"}
                alt={item.productId?.productName || "Product Image"}
                className='size-20 object-cover rounded'
              />

              {/* Product Details */}
              <div className='flex-1 flex justify-between items-center text-base'>
                <div className='flex flex-col justify-between font-semibold'>
                  <Link
                    to={`/products/${item.productId?.productName}/${item.productId?.size}`}
                  >
                    {item.productId?.productName}
                  </Link>

                  <div className='flex items-center gap-3 bg-white/10 rounded-full py-2'>
                    Qty:
                    <span className='flex items-center rounded-full px-1'>
                      <HiOutlineMinusSm
                        className='hover:text-accent hover:bg-gray-300 rounded-full transition-colors'
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity - 1
                          )
                        }
                      />
                      <span className='flex justify-center w-8 text-center font-medium rounded-full'>
                        {item.quantity}
                      </span>
                      <HiOutlinePlusSm
                        className='hover:text-accent hover:bg-gray-300 rounded-full transition-colors'
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                      />
                    </span>
                  </div>
                  <p className='font-semibold'>
                    R{((item.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
                <RiDeleteBin5Line
                  className='text-red-500 cursor-pointer hover:text-red-700 text-2xl '
                  onClick={() => handlesRemoveItem(item.productId._id || "")}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500 text-center py-3'>Your cart is empty.</p>
      )}

      <div className='border-y border-black/20 p-2 mt-auto space-y-2'>
        <span className='flex justify-between'>
          Total:{" "}
          <p className='font-bold'>
            {cart ? <>R{cart?.totalPrice.toFixed(2)}</> : '-'}
          </p>
        </span>
        <button
          type='submit'
          className='border border-black/20 bg-accent hover:bg-secondary hover:text-black text-white px-5 py-1 cursor-pointer w-full rounded-full'
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
