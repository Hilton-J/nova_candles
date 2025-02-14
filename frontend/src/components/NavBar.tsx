import { NavLink } from "react-router";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const NavBar = () => {
  return (
    <div className='flex justify-between'>
      <div>
        <NavLink to='/'>
          <h1 className='font-cinzel text-accent text-4xl font-bold'>NOVA</h1>
        </NavLink>
      </div>
      <div>
        <NavLink to='/about' className={({ isActive }) => (isActive ? "" : "")}>
          ABOUT
        </NavLink>
        <NavLink to='/shop' className={({ isActive }) => (isActive ? "" : "")}>
          SHOP
        </NavLink>
        <HiOutlineShoppingBag />
      </div>
    </div>
  );
};

export default NavBar;
