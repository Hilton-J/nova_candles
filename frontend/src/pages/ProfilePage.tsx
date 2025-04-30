import {
  Box,
  FileText,
  LogOut,
  MapPin,
  Package,
  Settings,
  Truck,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { TabItem, Tabs } from "flowbite-react";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../utils/extractError";
// import { Link } from "react-router";
import { useUpdateUserMutation } from "../slices/userApiSlice";

// const customTheme = createTheme({
//   pills:
// })

const ProfilePage = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [data, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      console.log("Minor changes");
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  return (
    <div className='container mx-auto py-16 px-4'>
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
          // onClick={logout}
        >
          <LogOut className='mr-2 h-4 w-4' />
          Sign Out
        </button>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        {/* TABS */}
        <Tabs aria-label='Pills' variant='pills'>
          {/* PROFILE */}
          <TabItem active title='Profile' icon={User}>
            <form onSubmit={handleSubmit} className='space-y-6 max-w-[50%]'>
              <div className='space-y-3'>
                <label
                  className='block text-destructiv font-medium'
                  htmlFor='email'
                >
                  First Name
                </label>
                <input
                  className='flex h-10 w-full rounded-md border border-black/20 bg-background px-3 py-2 text-base ring-offset-background laceholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-candleamber focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none focus:ring-1 focus:ring-candleamber'
                  type='text'
                  id='firstName'
                  name='firstName'
                  defaultValue={userInfo?.firstName}
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
                  name='lastName'
                  defaultValue={userInfo?.lastName}
                />
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
                  name='email'
                  defaultValue={userInfo?.email}
                  disabled
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
                  type='text'
                  inputMode='numeric'
                  pattern='0[6-8][0-9]{8}'
                  id='phoneNumber'
                  name='phoneNumber'
                  defaultValue={userInfo?.phoneNumber}
                />
              </div>

              <button
                type='submit'
                className='cursor-pointer px-3 py-2 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors'
                disabled={isLoading}
              >
                {isLoading ? <>Saving...</> : "Save Changes"}
              </button>
            </form>
          </TabItem>

          {/* ORDERS */}
          <TabItem title='Orders' icon={Box}>
            <div className='space-y-6'>
              <div className='flex items-center space-x-2'>
                <Package className='h-5 w-5 text-candledark' />
                <h3 className='text-xl font-medium'>My Orders</h3>
              </div>

              {/* {mockOrders.length > 0 ? (
                <Table>
                  <TableCaption>A list of your recent orders.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <>
                        <TableRow key={order.id}>
                          <TableCell className='font-medium'>
                            {order.id}
                          </TableCell>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge
                              variant='outline'
                              className={getStatusColor(order.status)}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className='text-right'>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => toggleOrderDetails(order.id)}
                              className='flex items-center'
                            >
                              <Eye className='h-4 w-4 mr-1' />
                              {selectedOrder === order.id ? "Hide" : "View"}
                            </Button>
                          </TableCell>
                        </TableRow>
                        {selectedOrder === order.id && (
                          <TableRow>
                            <TableCell colSpan={5} className='p-0'>
                              <Card className='bg-gray-50 m-0 rounded-none border-t-0 border-x-0'>
                                <CardContent className='p-4'>
                                  <h4 className='font-medium mb-2'>
                                    Order Items
                                  </h4>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Price</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {order.items.map((item, idx) => (
                                        <TableRow
                                          key={`${order.id}-item-${idx}`}
                                        >
                                          <TableCell>{item.name}</TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>
                                            ${item.price.toFixed(2)}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                  <div className='flex justify-end mt-4 space-x-2'>
                                    <Button size='sm' variant='outline'>
                                      Download Invoice
                                    </Button>
                                    {order.status === "delivered" && (
                                      <Button size='sm' variant='outline'>
                                        Return Items
                                      </Button>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className='text-center py-12 border rounded-md bg-gray-50'>
                  <Package className='h-12 w-12 mx-auto text-gray-400' />
                  <h3 className='mt-4 text-lg font-medium'>No orders yet</h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Your orders will appear here once you make a purchase.
                  </p>
                  <Button className='mt-4'>Start Shopping</Button>
                </div>
              )} */}
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
        {/* <Tabs defaultDefaultdefaultValue='profile'>
          <TabsList className='mb-6'>
            <TabsTrigger defaultValue='profile' className='flex items-center'>
              <User className='mr-2 h-4 w-4' />
              Profile
            </TabsTrigger>
            <TabsTrigger defaultValue='settings' className='flex items-center'>
              <Settings className='mr-2 h-4 w-4' />
              Account Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent defaultValue='profile'>
            <ProfileForm />
          </TabsContent>

          <TabsContent defaultValue='settings'>
            <div className='space-y-4'>
              <h3 className='text-xl font-medium'>Account Settings</h3>
              <p className='text-candlegray'>
                Manage your account settings and preferences.
              </p>

              <div className='border-t pt-4'>
                <h4 className='font-medium mb-2'>Email Notifications</h4>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <span>Marketing emails</span>
                    <input type='checkbox' className='toggle' />
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>New product announcements</span>
                    <input type='checkbox' className='toggle' defaultChecked />
                  </div>
                </div>
              </div>

              <div className='border-t pt-4'>
                <Button variant='destructive'>Delete Account</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs> */}
      </div>
    </div>
  );
};

export default ProfilePage;
