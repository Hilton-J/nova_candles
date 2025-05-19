import {
  Eye,
  User,
  Truck,
  LogOut,
  MapPin,
  Package,
  FileText,
  Settings,
} from "lucide-react";
import {
  Tabs,
  Badge,
  Modal,
  TabItem,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import {
  useGetOrdersByIdQuery,
  useGetOrdersByCustomerQuery,
} from "../slices/orderApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { logout } from "../slices/authSlice";
import { Link, useNavigate } from "react-router";
import { AppDispatch, RootState } from "../store";
import ProfileTab from "../components/ProfileTabForm";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { extractErrorMessage } from "../utils/extractError";
import { orderModalTheme } from "../components/themes/FlowbiteCustomStyles";
import { skipToken } from "@reduxjs/toolkit/query";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { data: userOrders } = useGetOrdersByCustomerQuery(1);
  const { data: orderDetails, isLoading } = useGetOrdersByIdQuery(
    selectedOrder ?? skipToken
  );
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const openOrderModal = (orderId: string) => {
    setSelectedOrder(orderId);
    setIsModalOpen(true);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "shipped":
        return "blue";
      case "cancelled":
        return "red";
      case "delivered":
        return "green";
      case "processing":
        return "yellow";
      default:
        return "gray";
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
          <TabItem active title='Profile' icon={User}>
            <ProfileTab />
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
                            <Badge
                              color={getStatusColor(order.status)}
                              className='w-fit rounded-full'
                              size='sm'
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className='text-right px-6 py-3'>
                            <button
                              className='flex items-center h-9 rounded-md px-3 hover:bg-secondary hover:text-accent-foreground cursor-pointer'
                              onClick={() => openOrderModal(order._id)}
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
                  <Package className='h-12 w-12 mx-auto text-secondary/60' />
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
        theme={orderModalTheme}
      >
        <ModalHeader className='bg-background border-none'>
          Order Details {orderDetails?.orderNumber}
        </ModalHeader>
        <ModalBody className='bg-background'>
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : (
            orderDetails && (
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium'>Date</p>
                    <p>
                      {new Date(orderDetails.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Status</p>
                    <p className='capitalize'>
                      <Badge
                        color={getStatusColor(orderDetails.status)}
                        className='w-fit rounded-full '
                        size='sm'
                      >
                        {orderDetails.status}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div className='bg-white p-4 rounded-lg border border-secondary shadow-md'>
                  <h4 className='font-medium mb-3'>Order Items</h4>
                  <table className='w-full text-sm text-left rtl:text-right divide-y divide-secondary'>
                    {/* TABLE HEADERS */}
                    <thead className='text-sm hover:bg-secondary/40'>
                      <tr className='rounded-t-md'>
                        <th scope='col' className='rounded-tl-md px-6 py-3'>
                          Item
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Quantity
                        </th>
                        <th scope='col' className='px-6 py-3'>
                          Price
                        </th>
                      </tr>
                    </thead>

                    <tbody className='divide-y divide-secondary'>
                      {orderDetails?.items.map((item) => (
                        <tr key={item._id} className='hover:bg-secondary/40'>
                          <td className='font-medium capitalize px-6 py-3'>
                            {item.productName}
                          </td>
                          <td className='px-6 py-3'>{item.quantity}</td>
                          <td className='px-6 py-3'>
                            R {item.price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='mt-4 text-right'>
                    <p className='font-medium'>
                      Total: R{orderDetails.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProfilePage;
