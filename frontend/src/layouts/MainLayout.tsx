import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <section className='flex flex-col items-center gap-15'>
      <header className='py-2 w-full flex justify-center border-b border-b-black/20'>
        <NavBar />
      </header>

      <main className='w-[90%]'>
        <Outlet />
      </main>
    </section>
  );
};

export default MainLayout;
