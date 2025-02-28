import { NavLink } from "react-router";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import {OutletContext} from '../interfaces/interfaces'

const NavBar = ({ setOpenLoginModal }: OutletContext) => {
  const activeNavLink = (isActive: boolean) =>
    isActive ? "text-accent" : "text-black";

  console.log(typeof setOpenLoginModal);

  return (
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
          <HiOutlineUser
            className='hover:text-accent'
            onClick={() => setOpenLoginModal(true)}
          />
          <HiOutlineShoppingBag className='hover:text-accent' />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
