import { NavLink } from "react-router";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const NavBar = () => {
  const activeNavLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-accent" : "text-black";

  return (
    <div className='flex justify-between items-center w-[90%]'>
      <div>
        <NavLink to='/'>
          <h1 className='font-cinzel text-accent text-4xl font-bold'>NOVA</h1>
        </NavLink>
      </div>
      <div className='flex items-center gap-10'>
        <NavLink to='/about' className={`${activeNavLink} hover:text-accent`}>
          ABOUT
        </NavLink>
        <NavLink to='/shop' className={`${activeNavLink} hover:text-accent`}>
          SHOP
        </NavLink>
        <span className='hover:text-accent'>
          <HiOutlineShoppingBag />
        </span>
      </div>
    </div>
  );
};

export default NavBar;
