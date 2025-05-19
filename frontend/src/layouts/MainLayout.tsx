import { Outlet } from "react-router";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ToastContainer, Zoom } from "react-toastify";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer
        position='bottom-right'
        autoClose={2000}
        transition={Zoom}
        className='z-50'
      />
    </>
  );
};

export default MainLayout;
