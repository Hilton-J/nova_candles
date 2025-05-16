import {
  Eye,
  FileText,
  LogOut,
  MapPin,
  Package,
  Settings,
  Truck,
  User,
} from "lucide-react";
import {
  useLogoutMutation,
  useUpdateUserMutation,
} from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Modal, ModalBody, ModalHeader, TabItem, Tabs } from "flowbite-react";
import { IUser } from "../interfaces/interfaces";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { extractErrorMessage } from "../utils/extractError";
import { logout, setCredentials } from "../slices/authSlice";
import { useGetOrdersByCustomerQuery } from "../slices/orderApiSlice";
import { useState } from "react";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Partial<IUser>>({
    mode: "onChange",
    defaultValues: {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      email: userInfo?.email,
      phoneNumber: userInfo?.phoneNumber,
    },
  });

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { data: userOrders } = useGetOrdersByCustomerQuery(1);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  console.log(userOrders);

  const onSubmit = async (data: Partial<IUser>) => {
    // e.preventDefault();
    try {
      const res = await updateUser(data).unwrap();
      const { results, message } = res;
      dispatch(setCredentials({ ...results }));
      toast.success(message);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  return (
    <div className='container mx-auto py-16 px-4 '>
      <div className='mb-8 flex flex-col md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-3xl font-serif font-bold text-candledark'>
            My Account
          </h1>
          <p className='text-candlegray'>
            Welcome back, {userInfo?.firstName + " " + userInfo?.lastName}
          </p>
        </div>
        <button
          className='flex items-center mt-4 md:mt-0 px-4 py-2 border border-border hover:bg-secondary hover:text-accent-foreground rounded-md text-sm font-medium h-10 transition-colors cursor-pointer'
          onClick={handleLogout}
        >
          <LogOut className='mr-2 h-4 w-4' />
          Log Out
        </button>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        {/* TABS */}
        <Tabs aria-label='Pills' variant='pills'>
          {/* PROFILE */}
          <TabItem active title='Profile' icon={User} className='bg-black'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='space-y-6 max-w-[50%]'
            >
              <div className='space-y-3'>
                <label
                  className='block text-destructiv font-medium'
                  htmlFor='email'
                >
                  First Name
                </label>
                <input
                  className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
                  type='text'
                  id='firstName'
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  disabled={isLoading}
                />
              </div>

              <div className='space-y-3'>
                <label
                  className='block text-destructiv font-medium'
                  htmlFor='email'
                >
                  Last Name
                </label>
                <input
                  className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
                  type='text'
                  id='lastName'
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className='space-y-3'>
                <label
                  className='block text-destructiv font-medium'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
                  type='email'
                  id='email'
                  disabled
                  {...register("email")}
                />
              </div>

              <div className='space-y-3'>
                <label
                  className='block text-destructiv font-medium'
                  htmlFor='email'
                >
                  Mobile Number
                </label>
                <input
                  className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
                  type='tel'
                  inputMode='tel'
                  id='phoneNumber'
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    min: 10,
                    maxLength: 12,
                    pattern: {
                      value: /0[6-8][0-9]{8}/i,
                      message: "Format must be 0655235235",
                    },
                  })}
                  disabled={isLoading}
                />
                {errors.phoneNumber && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <button
                type='submit'
                className='cursor-pointer px-3 py-2 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors disabled:bg-candledark/50 disabled:cursor-not-allowed'
                disabled={!isDirty}
              >
                {isLoading ? <>Saving...</> : "Save Changes"}
              </button>
            </form>
          </TabItem>

          {/* ORDERS */}
          <TabItem title='Orders' icon={Package}>
            <div className='space-y-6'>
              <div className='flex items-center space-x-2'>
                <Package className='h-5 w-5 text-candledark' />
                <h3 className='text-xl font-medium'>My Orders</h3>
              </div>

              {userOrders?.results && userOrders.results.length > 0 ? (
                <table className='w-full text-sm text-left rtl:text-right divide-y divide-secondary'>
                  {/* TABLE HEADERS */}
                  <thead className='text-sm hover:bg-secondary/40'>
                    <tr className='rounded-t-md'>
                      <th scope='col' className='rounded-tl-md px-6 py-3'>
                        Order Number
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Date
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Total
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Status
                      </th>
                      <th scope='col' className='text-right px-6 py-3'>
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-secondary'>
                    {userOrders &&
                      userOrders?.results.map((order) => (
                        <tr key={order._id} className='hover:bg-secondary/40'>
                          <td className='font-medium uppercase px-6 py-3'>
                            {order.orderNumber}
                          </td>
                          <td className='px-6 py-3'>
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td className='px-6 py-3'>
                            R {order.totalPrice.toFixed(2)}
                          </td>
                          <td className='capitalize px-6 py-3'>
                            {order.status}
                          </td>
                          <td className='text-right px-6 py-3'>
                            <button
                              className='flex items-center h-9 rounded-md px-3 hover:bg-secondary hover:text-accent-foreground cursor-pointer'
                              onClick={() => setIsModalOpen(true)}
                            >
                              <Eye className='h-4 w-4 mr-1' />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div className='text-center py-12 border rounded-md bg-gray-50'>
                  <Package className='h-12 w-12 mx-auto text-gray-400' />
                  <h3 className='mt-4 text-lg font-medium'>No orders yet</h3>
                  <p className='mt-1 text-sm text-gray-500 mb-4'>
                    Your orders will appear here once you make a purchase.
                  </p>
                  <Link
                    to='/shop'
                    className='cursor-pointer px-3 py-2 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors disabled:bg-candledark/50 disabled:cursor-not-allowed'
                  >
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </TabItem>

          {/* RETURNS */}
          <TabItem title='Returns' icon={Truck}></TabItem>

          {/* INVOICES */}
          <TabItem title='Invoices' icon={FileText}></TabItem>

          {/* ADDRESSES */}
          <TabItem title='Addresses' icon={MapPin}></TabItem>

          {/* SETTINGS */}
          <TabItem title='Settings' icon={Settings}></TabItem>
        </Tabs>
      </div>

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className='bg-secondary'
      >
        <ModalHeader />
        <ModalBody className='bg-secondary'>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-muted-foreground'>Date</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className='text-sm '>Status</p>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProfilePage;
