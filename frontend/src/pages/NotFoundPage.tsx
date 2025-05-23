import { Link } from "react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const NotFoundPage = () => {
  return (
    <section className='h-screen flex flex-col'>
      <NavBar />
      <div className='container flex-1 mx-auto px-4 py-20 text-center'>
        <h1 className='font-playfair text-6xl font-medium text-candledark mb-4'>
          404
        </h1>
        <p className='text-xl text-candlegray mb-8'>
          Oops! The page you're looking for cannot be found.
        </p>
        <Link
          to='/'
          className='inline-flex items-center justify-center px-6 py-3 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors'
        >
          Return Home
        </Link>
      </div>
      <Footer />
    </section>
  );
};

export default NotFoundPage;
