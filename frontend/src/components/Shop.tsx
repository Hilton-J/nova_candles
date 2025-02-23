import { IProduct } from "../interfaces/interfaces";
import { useGetAllProductQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

const Shop = () => {
  const { data, isLoading } = useGetAllProductQuery(1);

  console.log(isLoading);
  console.log("Products", data);

  return (
    <section className='flex flex-col items-center gap-5 h-full'>
      <h1 className='2xl:text-5xl w-[45%] text-center'>
        Curated Premium Wax Candles For Every Mood
      </h1>
      {isLoading && data ? (
        <Loader loading={!isLoading} />
      ) : (
        <div className='grid grid-cols-4 gap-x-10 gap-y-5'>
          {data?.results.map((res: IProduct) => (
            <ProductCard /*TODO: This needs to be disigned */ {...res} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;
