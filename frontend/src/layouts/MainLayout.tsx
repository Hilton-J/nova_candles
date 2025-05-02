import { Outlet } from "react-router";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {

  return (
    <>
      <NavBar/>
      <Outlet  />
      <Footer />
      {/* {openLoginModal && <LoginModal setOpenLoginModal={setOpenLoginModal} />} */}
      <ToastContainer className='z-50' />
    </>
  );
};

export default MainLayout;
