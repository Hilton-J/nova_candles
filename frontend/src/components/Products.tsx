import Loader from "./Loader";
import { Link } from "react-router";
import ProductCard from "./ProductCard";
import { useGetAllProductQuery } from "../slices/productApiSlice";

const Products = () => {
  const { data, isLoading } = useGetAllProductQuery(1);

  const product = data?.results.slice(0, 3);

  return (
    <section className='py-20 bg-candlelight'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='font-serif text-3xl font-medium text-candledark mb-4'>
            Featured Products
          </h2>
          <p className='text-candlegray max-w-2xl mx-auto'>
            Explore our most popular fragrances, carefully crafted to transform
            your space with inviting scents and warm ambiance.
          </p>
        </div>

        {isLoading ? (
          <Loader loading={isLoading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {product?.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        )}

        <div className='text-center mt-12'>
          <Link
            to='/shop'
            className='inline-flex items-center justify-center px-6 py-3 bg-candleamber text-white rounded-md hover:bg-opacity-90 transition-colors'
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>

    // <section className='flex flex-col items-center mt-15 gap-5'>
    //   <h1 className='text-center xl:w-[28rem] 2xl:w-[45rem] xl:text-3xl 2xl:text-5xl'>
    //     Curated Premium Wax Candles For Every Mood
    //   </h1>
    //   <Link
    //     to={"/shop"}
    //     className='border border-black/20 bg-accent hover:bg-secondary hover:text-black text-white py-2 px-5 cursor-pointer ml-auto '
    //   >
    //     <button>Shop</button>
    //   </Link>
    //   {isLoading ? (
    //     <Loader loading={isLoading} />
    //   ) : (
    //     <div className='grid grid-cols-4 gap-x-10 gap-y-5 w-full'>
    //       {product?.map((res: IProduct) => (
    //         <ProductCard key={res._id} {...res} />
    //       ))}
    //     </div>
    //   )}
    // </section>
  );
};

export default Products;
