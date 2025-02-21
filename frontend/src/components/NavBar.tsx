import { NavLink } from "react-router";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const NavBar = () => {
  const activeNavLink = (isActive: boolean) =>
    isActive ? "text-accent" : "text-black";

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
        <span className='hover:text-accent text-sm xl:text-xl 2xl:text-2xl'>
          <HiOutlineShoppingBag />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
