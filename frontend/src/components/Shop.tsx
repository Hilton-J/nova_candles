import { useGetAllProductQuery } from "../slices/productApiSlice";
import { PuffLoader } from "react-spinners";

const Shop = () => {
  const { data, isLoading } = useGetAllProductQuery(1);

  console.log(isLoading);
  console.log("Products", data);

  return (
    <section className='flex flex-col items-center gap-5'>
      <h1 className='2xl:text-5xl w-[45%] text-center'>
        Curated Premium Wax Candles For Every Mood
      </h1>
      <div className='border border-red-500 w-full'>
        {!isLoading ? <PuffLoader color=""/> : <div></div>}
      </div>
    </section>
  );
};

export default Shop;
