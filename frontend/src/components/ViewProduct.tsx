import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import { IProduct } from "../interfaces/interfaces";
import { useEffect, useState } from "react";

const ViewProduct = () => {
  const { id, size } = useParams<{ id: string; size: string }>();
  const [productSize, setProductSize] = useState<string | undefined>(size);
  const { data, isLoading } = useGetProductByIdQuery(id || "");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const product = data?.find(
    (item: IProduct) => item.size.toLowerCase() === productSize?.toLowerCase()
  );

  useEffect(() => {
    setProductSize(size);
    if (product?.images.length) setSelectedImage(product?.images[0]);
  }, [size, product]);

  return (
    <>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <div className='grid md:grid-cols-[35%_65%] h-[60%] gap-10'>
          <div className='grid grid-cols-[10%_88%] gap-[2%]'>
            {/* Thumbnails */}
            <div className='flex flex-col gap-2'>
              {product?.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`size-16 object-cover cursor-pointer ${
                    selectedImage === img ? "brightness-100" : "brightness-50"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>

            {/* Main Image */}
            <img
              src={selectedImage}
              alt={product?.productName}
              className='size-full object-cover'
            />
          </div>

          {/* Right Side: Product Details */}
          <div className='flex flex-col'>
            <div>
              <h1>
                {product?.productName} -
                <span className='capitalize'> {product?.size}</span>
              </h1>
              <p>R{product?.price.toFixed(2)}</p>
            </div>

            {/* Display Size Selector Only If Product Size is Valid */}
            {["small", "medium", "large"].includes(product?.size || "") && (
              <div>
                <h2>
                  Select size:{" "}
                  <span className='capitalize'>{product?.size}</span>
                </h2>
                <div>
                  {["small", "medium", "large"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setProductSize(s)}
                      className={`${
                        productSize === s
                          ? "bg-accent text-white"
                          : "bg-secondary "
                      } border border-black/20 hover:bg-transparent hover:text-black text-black py-1 px-3 cursor-pointer ml-auto`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <p>
              {/* Is a reminiscent of warm beach days, high notes of lemon palm and
              floral freesia to draw into the midst of warm coconut and sweet
              sugarcane. It ends with a luxury vetiver and hint of vanilla */}
              {product?.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProduct;
