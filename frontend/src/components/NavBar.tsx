import { NavLink } from "react-router";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import { OutletContext } from "../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetUserCartQuery } from "../slices/cartApiSlice";
import Cart from "./Cart";
import { useState } from "react";

const NavBar = ({ setOpenLoginModal }: OutletContext) => {
  const { data, isLoading } = useGetUserCartQuery();
  const [openCart, setOpenCart] = useState(false);
  const activeNavLink = (isActive: boolean) =>
    isActive ? "text-accent" : "text-black";
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const toggleDrawer = () => {
    setOpenCart((prevState) => !prevState);
  };

  return (
    <>
      <div className='flex justify-between items-center w-[90%]'>
        <div className=''>
          <NavLink to='/'>
            <h1 className='font-cinzel text-accent text-lg md:text-3xl xl:text-4xl font-bold'>
              NOVA
            </h1>
          </NavLink>
        </div>
        <div className='flex items-center gap-10'>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              `${activeNavLink(
                isActive
              )} hover:text-accent text-sm xl:text-xl 2xl:text-2xl`
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to='/shop'
            className={({ isActive }) =>
              `${activeNavLink(
                isActive
              )} hover:text-accent text-sm xl:text-xl 2xl:text-2xl`
            }
          >
            SHOP
          </NavLink>
          <span className='flex gap-3 text-sm xl:text-xl 2xl:text-2xl'>
            {userInfo ? (
              <HiOutlineUser
                className='hover:text-accent cursor-pointer'
                onClick={() => setOpenLoginModal(true)}
              />
            ) : (
              <p
                className='hover:text-accent cursor-pointer'
                onClick={() => setOpenLoginModal(true)}
              >
                LOGIN
              </p>
            )}
            <div className='relative'>
              <HiOutlineShoppingBag
                className='hover:text-accent cursor-pointer'
                onClick={toggleDrawer}
              />
              {userInfo && (
                <span className='flex items-center justify-center leading-none absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-accent min-size-4 size-4 text-white text-xs rounded-full font-sans'>
                  {data && isLoading ? 0 : data?.items.length}
                </span>
              )}
            </div>
          </span>
        </div>
      </div>
      <Cart openCart={openCart} toggleDrawer={toggleDrawer} cart={data} />
    </>
  );
};

export default NavBar;
