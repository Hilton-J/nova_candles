import { Link } from "react-router";
import { useGetAllProductQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import { IProduct } from "../interfaces/interfaces";
import ProductCard from "./ProductCard";

const Products = () => {
  const { data, isLoading } = useGetAllProductQuery(1);

  const product = data?.results.slice(0, 4);

  return (
    <section className='flex flex-col items-center mt-15 gap-5'>
      <h1 className='text-center xl:w-[28rem] 2xl:w-[45rem] xl:text-3xl 2xl:text-5xl'>
        Curated Premium Wax Candles For Every Mood
      </h1>
      <Link
        to={"/shop"}
        className='border border-black/20 bg-accent hover:bg-secondary hover:text-black text-white py-2 px-5 cursor-pointer ml-auto'
      >
        <button>Shop</button>
      </Link>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <div className='grid grid-cols-4 gap-x-10 gap-y-5 w-full'>
          {product?.map((res: IProduct) => (
            <ProductCard key={res._id} {...res} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
