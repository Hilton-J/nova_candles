import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <section className='flex flex-col items-center gap-10 md:gap-15 xl:gap-20'>
      <header className='py-2 xl:py-4 2xl:py-5 w-full flex justify-center border-b border-b-black/20'>
        <NavBar />
      </header>

      <main className='w-[90%]'>
        <Outlet />
      </main>
      <footer className='bg-white w-full p-24 '>
        <Footer />
      </footer>
    </section>
  );
};

export default MainLayout;
