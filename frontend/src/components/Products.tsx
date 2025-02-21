import { Link } from "react-router";

const Products = () => {
  return (
    <section className='flex flex-col items-center mt-15 gap-5'>
      <h1 className='2xl:text-5xl w-[45%] text-center'>
        Curated Premium Wax Candles For Every Mood
      </h1>
      <Link
        to={"/shop"}
        className='border border-black/20 bg-accent hover:bg-secondary hover:text-black text-white py-2 px-5 cursor-pointer ml-auto'
      >
        <button>Shop</button>
      </Link>
    </section>
  );
};

export default Products;
