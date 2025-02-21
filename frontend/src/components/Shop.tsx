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
        <div className='grid grid-cols-5'>
          {data?.results.map((res: IProduct, index: number) => (
            <ProductCard /*TODO: This needs to be disigned */
              image='No Image'
              title={res.productName}
              id={res._id}
              index={index}
              size={res.size}
              price={res.price}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;
