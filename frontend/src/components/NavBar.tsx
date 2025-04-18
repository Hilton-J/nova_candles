import { NavLink } from "react-router";
// import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import { ShoppingCart, Menu, X, User } from "lucide-react";
// import { OutletContext } from "../interfaces/interfaces";
import { /*useDispatch,*/ useSelector } from "react-redux";
import { /*AppDispatch,*/ RootState } from "../store";
import { useGetUserCartQuery } from "../slices/cartApiSlice";
import Cart from "./Cart";
import { useState } from "react";
// import { useLogoutMutation } from "../slices/userApiSlice";
// import { logout } from "../slices/authSlice";
// import { toast } from "react-toastify";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data } = useGetUserCartQuery();
  const [openCart, setOpenCart] = useState(false);
  // const [openProfile, setOpenProfile] = useState(false);
  // const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  // const dispatch = useDispatch<AppDispatch>();

  const toggleDrawer = () => {
    setOpenCart((prevState) => !prevState);
  };

  // const toggleProfile = () => {
  //   setOpenProfile((prevState) => !prevState);
  // };

  // const logoutHandler = async () => {
  //   setOpenProfile((prevState) => !prevState);
  //   try {
  //     await logoutApiCall({}).unwrap();
  //     dispatch(logout());
  //   } catch (error) {
  //     if (error && typeof error === "object" && "data" in error) {
  //       toast.error((error as { data: { message: string } }).data.message);
  //     } else {
  //       toast.error(`An unexpected error occurred: ${error}`);
  //     }
  //   }
  // };

  const activeNavLink = (isActive: boolean) =>
    isActive ? "text-candleamber font-medium" : "text-candledark";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className='bg-background border-b border-black/20 py-4 sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <NavLink
            to='/'
            className='font-cinzel text-2xl font-medium text-candledark transition-colors'
          >
            Nova
          </NavLink>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-8'>
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `${activeNavLink(
                    isActive
                  )} text-sm hover:text-candleamber transition-colors`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Auth and Cart */}
          <div className='flex items-center space-x-4'>
            {userInfo ? (
              <div className='hidden md:flex items-center'>
                <NavLink
                  to='/profile'
                  className={({ isActive }) =>
                    `${activeNavLink(
                      isActive
                    )} flex items-center text-sm hover:text-candleamber transition-colors`
                  }
                >
                  <User className='mr-1.5 h-4 w-4' />
                  {userInfo
                    ? userInfo.firstName + " " + userInfo.lastName
                    : "Profile"}
                </NavLink>
              </div>
            ) : (
              <div className='hidden md:flex items-center space-x-4'>
                <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    `${activeNavLink(
                      isActive
                    )} text-sm hover:text-candleamber transition-colors`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to='/register'
                  className='inline-flex items-center bg-candleamber text-primary hover:bg-candleamber/80 h-9 rounded-md px-3 transition-colors'
                >
                  Sign Up
                </NavLink>
              </div>
            )}

            <NavLink to='/cart' className='relative p-2'>
              <ShoppingCart className='h-5 w-5 text-candledark hover:text-candleamber transition-colors' />
              {data && data?.items.length > 0 && (
                <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-candleamber rounded-full'>
                  {data?.items.length}
                </span>
              )}
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              className='hover:bg-accent hover:text-accent-foreground h-10 w-10 md:hidden ml-2'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </button>
          </div>

          {openCart && (
            <div className='size-full bg-black/55 fixed top-0 transform translate-x-0 transition-transform duration-700'>
              <Cart toggleDrawer={toggleDrawer} cart={data} />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {/* {mobileMenuOpen && (
          <div className='md:hidden pt-4 pb-2'>
            <div className='flex flex-col space-y-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm px-2 py-2 hover:bg-secondary rounded-md transition-colors ${
                    location.pathname === link.path
                      ? "text-candleamber font-medium"
                      : "text-candledark"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              // Mobile Auth Links
              {userInfo ? (
                <>
                  <Link
                    to='/profile'
                    className={`text-sm px-2 py-2 hover:bg-secondary rounded-md transition-colors flex items-center ${
                      location.pathname === "/profile"
                        ? "text-candleamber font-medium"
                        : "text-candledark"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className='mr-2 h-4 w-4' />
                    My Profile
                  </Link>
                  <button
                    className='text-sm px-2 py-2 text-left hover:bg-secondary rounded-md transition-colors text-candledark'
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to='/login'
                    className={`text-sm px-2 py-2 hover:bg-secondary rounded-md transition-colors ${
                      location.pathname === "/login"
                        ? "text-candleamber font-medium"
                        : "text-candledark"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to='/register'
                    className={`text-sm px-2 py-2 hover:bg-secondary rounded-md transition-colors ${
                      location.pathname === "/register"
                        ? "text-candleamber font-medium"
                        : "text-candledark"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )} */}
      </div>
    </nav>

    //     {/* Links */}
    //     <div className='flex items-center gap-10 text-sm xl:text-xl 2xl:text-2xl transition-all duration-700'>
    //       <NavLink
    //         to='/about'
    //         className={({ isActive }) =>
    //           `${activeNavLink(isActive)} hover:text-accent `
    //         }
    //       >
    //         ABOUT
    //       </NavLink>
    //       <NavLink
    //         to='/shop'
    //         className={({ isActive }) =>
    //           `${activeNavLink(isActive)} hover:text-accent`
    //         }
    //       >
    //         SHOP
    //       </NavLink>
    //       <span className='flex gap-5'>
    //         {userInfo ? (
    //           <HiOutlineUser
    //             className='hover:text-accent cursor-pointer'
    //             onClick={toggleProfile}
    //             // onMouseLeave={() => setOpenProfile(false)}
    //           />
    //         ) : (
    //           <p
    //             className='hover:text-accent cursor-pointer'
    //             onClick={() => setOpenLoginModal(true)}
    //           >
    //             LOGIN
    //           </p>
    //         )}

    //         {openProfile && (
    //           <div className='absolute text-lg bg-secondary border border-black/20 w-30 h-26 p-3 top-0 right-0 -translate-x-34 translate-y-13 z-50 shadow-xl'>
    //             <Link to={"/profile"} className='hover:text-accent'>
    //               Profile
    //             </Link>
    //             <button
    //               className='block hover:text-accent cursor-pointer'
    //               onClick={logoutHandler}
    //             >
    //               Logout
    //             </button>
    //           </div>
    //         )}

    //         <div className='relative flex items-center'>
    //           <HiOutlineShoppingBag
    //             className='hover:text-accent cursor-pointer'
    //             onClick={toggleDrawer}
    //           />
    //           {userInfo && data && (
    //             <span className='flex items-center justify-center leading-none absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-accent min-size-4 size-4 text-white text-xs rounded-full font-sans'>
    //               {data && isLoading ? 0 : data?.items.length}
    //             </span>
    //           )}
    //         </div>
    //       </span>
    //     </div>
    //   </div>

    //   {openCart && (
    //     <div className='size-full bg-black/55 fixed top-0 transform translate-x-0 transition-transform duration-700'>
    //       <Cart toggleDrawer={toggleDrawer} cart={data} />
    //     </div>
    //   )}
    // </>
  );
};

export default NavBar;
