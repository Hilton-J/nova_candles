import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import { IProduct } from "../interfaces/interfaces";
import { useState } from "react";

const ViewProduct = () => {
  const { id, size } = useParams<{ id: string; size: string }>();
  const [productSize, setProductSize] = useState<string | undefined>(size);
  const { data, isLoading } = useGetProductByIdQuery(id || "");

  const product = data?.find(
    (item: IProduct) => item.size.toLowerCase() === productSize?.toLowerCase()
  );

  return (
    <>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <div className='grid md:grid-cols-[35%_65%] h-[60%]'>
          <div className=''>
            <img
              src={product?.images[0]}
              alt={product?.productName}
              className='w-full object-cover'
            />
          </div>
          <div className='flex flex-col'>
            <div>
              <h1>
                {product?.productName} -
                <span className='capitalize'> {product?.size}</span>
              </h1>
              <p>R{product?.price.toFixed(2)}</p>
            </div>
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
                        productSize === s ? "bg-accent text-white" : ""
                      } border border-black/20 hover:bg-secondary hover:text-black text-black py-1 px-3 cursor-pointer ml-auto`}
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
