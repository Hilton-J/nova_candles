// import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
// import LoginModal from "../components/LoginModal";

const MainLayout = () => {
  // const [openLoginModal, setOpenLoginModal] = useState(false);

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
