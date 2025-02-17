import { NavLink } from "react-router";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const NavBar = () => {
  const activeNavLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-accent" : "text-black";

  return (
    <div className='flex justify-between items-center w-[90%]'>
      <div className="">
        <NavLink to='/'>
          <h1 className='font-cinzel text-accent text-3xl xl:text-4xl 2xl:text-7xl font-bold'>NOVA</h1>
        </NavLink>
      </div>
      <div className='flex items-center gap-10'>
        <NavLink to='/about' className={`${activeNavLink} hover:text-accent xl:text-xl 2xl:text-4xl`}>
          ABOUT
        </NavLink>
        <NavLink to='/shop' className={`${activeNavLink} hover:text-accent xl:text-xl 2xl:text-4xl`}>
          SHOP
        </NavLink>
        <span className='hover:text-accent xl:text-xl 2xl:text-4xl'>
          <HiOutlineShoppingBag />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
