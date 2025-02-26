import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import { IProduct } from "../interfaces/interfaces";
import { useEffect, useState } from "react";

const ViewProduct = () => {
  const { id, size } = useParams<{ id: string; size: string }>();
  const [productSize, setProductSize] = useState<string | undefined>(size);
  const { data, isLoading } = useGetProductByIdQuery(id || "");
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const product = data?.find(
    (item: IProduct) => item.size.toLowerCase() === productSize?.toLowerCase()
  );

  useEffect(() => {
    // setProductSize(size);
    if (product?.images.length) setSelectedImage(product?.images[0]);
  }, [size, product]);

  return (
    <>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <div className='grid md:grid-cols-[35%_60%] gap-[5%] w-[90%] mx-auto'>
          {/* Left Side: Product Pictures */}
          <div className='grid grid-rows-subgrid row-span-2 gap-6 h-full'>
            {/* Main Image */}
            <div className='h-[35rem]'>
              <img
                src={selectedImage}
                alt={product?.productName}
                className='size-full object-cover'
              />
            </div>

            {/* Thumbnails */}
            <div className='flex gap-2'>
              {product?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`size-18 object-cover cursor-pointer ${
                    selectedImage === img ? "brightness-100" : "brightness-50"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className='flex flex-col'>
            <div className='xl:text-[2.7rem] 2xl:text-[4rem]'>
              <h1>
                {product?.productName} -
                <span className='capitalize'> {product?.size}</span>
              </h1>
              <p className='font-bold'>R{product?.price.toFixed(2)}</p>
            </div>

            {/* Display Size Selector Only If Product Size is Valid */}
            {["small", "medium", "large"].includes(product?.size || "") && (
              <div>
                <div className='border border-black/20 w-[90%] mb-3'></div>
                <h2 className='xl:text-[1.5rem] '>
                  Select size:
                  <span className='capitalize'> {product?.size}</span>
                </h2>
                <div className='space-x-2'>
                  {["small", "medium", "large"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setProductSize(s)}
                      className={`${
                        productSize === s
                          ? "bg-accent text-white"
                          : "bg-transparent "
                      } border border-black/20 hover:bg-secondary hover:text-black text-black py-1 px-3 cursor-pointer ml-auto`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className='border border-black/20 w-[90%] my-3'></div>

            <p className='w-[90%]'>{product?.description}</p>
            <div>
              <input
                type="number"
                defaultValue={1}
                className='border border-black/20 py-1 px-3'
              />
              <button className='mt-3 bg-accent text-white border border-black/20 hover:bg-secondary hover:text-black py-1 px-3 mr-auto cursor-pointer h-fit'>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
