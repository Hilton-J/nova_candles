import { useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import LoginModal from "../components/LoginModal";

const MainLayout = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);

  return (
    <>
      <section className='flex flex-col items-center gap-10 md:gap-15 xl:gap-20 max-w-[1920px]'>
        <header className='py-2 xl:py-4 2xl:py-5 w-full flex justify-center border-b border-b-black/20'>
          <NavBar setOpenLoginModal={setOpenLoginModal} />
        </header>

        <main className='w-[90%] min-h-screen'>
          <Outlet context={{ setOpenLoginModal }} />
        </main>
        <footer className='bg-secondary w-full p-24 '>
          <Footer />
        </footer>
      </section>
      {openLoginModal && (
        <LoginModal setOpenLoginModal={setOpenLoginModal} />
      )}
      <ToastContainer className='z-50' />
    </>
  );
};

export default MainLayout;
