import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default AdminLayout;
