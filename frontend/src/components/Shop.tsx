import { IProduct } from "../interfaces/interfaces";
import { useGetAllProductQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import ProductCard from "./ProductCard";

const Shop = () => {
  const { data, isLoading } = useGetAllProductQuery(1);

  return (
    // <section className='flex flex-col items-center gap-5 h-full'>
    //   <h1 className='text-center xl:w-[28rem] 2xl:w-[45rem] xl:text-3xl 2xl:text-5xl'>
    //     Curated Premium Wax Candles For Every Mood
    //   </h1>
    //   {isLoading ? (
    //     <Loader loading={isLoading} />
    //   ) : (
    //     <div className='grid grid-cols-4 gap-x-10 gap-y-5 w-full'>
    //       {data?.results.map((res: IProduct) => (
    //         <ProductCard key={res._id} {...res} />
    //       ))}
    //     </div>
    //   )}
    // </section>
    <>
      {/* Shop Header */}
      <section className='bg-hero-pattern py-12'>
        <div className='container mx-auto px-4'>
          <h1 className='font-serif text-4xl font-medium text-candledark text-center'>
            Shop Our Collection
          </h1>
          <p className='text-candlegray text-center max-w-xl mx-auto mt-4'>
            Browse our selection of handcrafted candles and linen sprays, all
            made with natural ingredients and captivating fragrances.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          {/* Filters */}
          {/* <div className="mb-8 pb-6 border-b border-border">
            <div className="flex flex-wrap gap-6">
              <div>
                <h3 className="text-sm font-medium text-candledark mb-2">
                  Filter by Fragrance
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedFragrance(null)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedFragrance === null
                        ? "bg-candleamber text-white"
                        : "bg-secondary text-candledark hover:bg-candleamber hover:text-white"
                    } transition-colors`}
                  >
                    All
                  </button>
                  
                  {fragranceOptions.map((fragrance) => (
                    <button
                      key={fragrance.id}
                      onClick={() => setSelectedFragrance(fragrance.name)}
                      className={`px-3 py-1 text-sm rounded-md ${
                        selectedFragrance === fragrance.name
                          ? "bg-candleamber text-white"
                          : "bg-secondary text-candledark hover:bg-candleamber hover:text-white"
                      } transition-colors`}
                    >
                      {fragrance.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-candledark mb-2">
                  Filter by Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedType === null
                        ? "bg-candleamber text-white"
                        : "bg-secondary text-candledark hover:bg-candleamber hover:text-white"
                    } transition-colors`}
                  >
                    All
                  </button>
                  
                  <button
                    onClick={() => setSelectedType("candle")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedType === "candle"
                        ? "bg-candleamber text-white"
                        : "bg-secondary text-candledark hover:bg-candleamber hover:text-white"
                    } transition-colors`}
                  >
                    Candles
                  </button>
                  
                  <button
                    onClick={() => setSelectedType("spray")}
                    className={`px-3 py-1 text-sm rounded-md ${
                      selectedType === "spray"
                        ? "bg-candleamber text-white"
                        : "bg-secondary text-candledark hover:bg-candleamber hover:text-white"
                    } transition-colors`}
                  >
                    Linen Spray
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          {/* Products Grid */}
          {isLoading ? (
            <Loader loading={isLoading} />
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {data?.results.map((res: IProduct) => (
                <ProductCard key={res._id} {...res} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
