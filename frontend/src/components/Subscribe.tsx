// import { Link } from "react-router";
import Logo from "../assets/images/logo1.png";
const Subscribe = () => {
  return (
    <section className='flex justify-center mt-15'>
      <div className='w-fit flex flex-col items-center'>
        <img src={Logo} alt='Nova Logo' className='mix-blend-difference mb-8' />
        <form className='flex gap-5'>
          <input
            type='email'
            placeholder='Your Email'
            required
            className='border border-black/20 bg-secondary px-4 py-2 outline-0 w-96'
          />
          <button
            type='submit'
            className='border border-black/20 bg-accent hover:bg-secondary hover:text-black text-white px-5 cursor-pointer'
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
