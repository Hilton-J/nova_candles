import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  return (
    <section className='max-w-[1536px]'>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </section>
  );
};

export default AdminLayout;
