import { IProduct } from "../interfaces/interfaces";
import { useGetAllProductQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

const Shop = () => {
  const { data, isLoading } = useGetAllProductQuery(1);

  return (
    <section className='flex flex-col items-center gap-5 h-full'>
      <h1 className='text-center xl:w-[28rem] 2xl:w-[45rem] xl:text-3xl 2xl:text-5xl'>
        Curated Premium Wax Candles For Every Mood
      </h1>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <div className='grid grid-cols-4 gap-x-10 gap-y-5 w-full'>
          {data?.results.map((res: IProduct) => (
            <ProductCard key={res._id} {...res} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;
