import { Link, NavLink } from "react-router";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import { OutletContext } from "../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useGetUserCartQuery } from "../slices/cartApiSlice";
import Cart from "./Cart";
import { useState } from "react";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

const NavBar = ({ setOpenLoginModal }: OutletContext) => {
  const { data, isLoading } = useGetUserCartQuery();
  const [openCart, setOpenCart] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [logoutApiCall] = useLogoutMutation();
  const activeNavLink = (isActive: boolean) =>
    isActive ? "text-accent" : "text-black";
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const toggleDrawer = () => {
    setOpenCart((prevState) => !prevState);
  };

  const toggleProfile = () => {
    setOpenProfile((prevState) => !prevState);
  };

  const logoutHandler = async () => {
    setOpenProfile((prevState) => !prevState);
    try {
      await logoutApiCall({}).unwrap();
      dispatch(logout());
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        toast.error((error as { data: { message: string } }).data.message);
      } else {
        toast.error(`An unexpected error occurred: ${error}`);
      }
    }
  };

  return (
    <>
      <div className='flex justify-between items-center w-[90%]'>
        {/* Logo */}
        <div className=''>
          <NavLink to='/'>
            <h1 className='font-cinzel text-accent text-lg md:text-3xl xl:text-3xl font-bold'>
              NOVA
            </h1>
          </NavLink>
        </div>

        {/* Links */}
        <div className='flex items-center gap-10 text-sm xl:text-xl 2xl:text-2xl transition-all duration-700'>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              `${activeNavLink(isActive)} hover:text-accent `
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to='/shop'
            className={({ isActive }) =>
              `${activeNavLink(isActive)} hover:text-accent`
            }
          >
            SHOP
          </NavLink>
          <span className='flex gap-5'>
            {userInfo ? (
              <HiOutlineUser
                className='hover:text-accent cursor-pointer'
                onClick={toggleProfile}
                // onMouseLeave={() => setOpenProfile(false)}
              />
            ) : (
              <p
                className='hover:text-accent cursor-pointer'
                onClick={() => setOpenLoginModal(true)}
              >
                LOGIN
              </p>
            )}

            {openProfile && (
              <div className='absolute text-lg bg-secondary border border-black/20 w-30 h-26 p-3 top-0 right-0 -translate-x-34 translate-y-13 z-50 shadow-xl'>
                <Link to={"/profile"} className='hover:text-accent'>
                  Profile
                </Link>
                <button
                  className='block hover:text-accent cursor-pointer'
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            )}

            <div className='relative flex items-center'>
              <HiOutlineShoppingBag
                className='hover:text-accent cursor-pointer'
                onClick={toggleDrawer}
              />
              {userInfo && data && (
                <span className='flex items-center justify-center leading-none absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-accent min-size-4 size-4 text-white text-xs rounded-full font-sans'>
                  {data && isLoading ? 0 : data?.items.length}
                </span>
              )}
            </div>
          </span>
        </div>
      </div>

      {openCart && (
        <div className='size-full bg-black/55 fixed top-0 transform translate-x-0 transition-transform duration-700'>
          <Cart toggleDrawer={toggleDrawer} cart={data} />
        </div>
      )}
    </>
  );
};

export default NavBar;
