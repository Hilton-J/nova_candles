import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import { Link } from "react-router";

const ViewProduct = () => {
  const { id } = useParams();
  const productID = id as string;
  const { data, isLoading } = useGetProductByIdQuery(productID);
  console.log("Data", !isLoading && data);

  return (
    <div className='grid md:grid-cols-[35%_65%] border min-h-[60%]'>
      <div className='border'>
        <img
          src={data?.images[0]}
          alt={data?.productName}
          className='w-full object-cover'
        />
      </div>
      <div className='flex flex-col'>
        <div>
          <h1>
            {data?.productName} -{" "}
            <span className='capitalize'>{data?.size}</span>
          </h1>
          <p>R{data?.price.toFixed(2)}</p>
        </div>
        <div>
          <h2>
            Select size: <span className='capitalize'>{data?.size}</span>
          </h2>
          <div>
            <Link
              to={""}
              className='border border-black/20 hover:bg-secondary hover:text-black text-black py-1 px-3 cursor-pointer ml-auto'
            >
              Small
            </Link>
            <Link
              to={""}
              className='border border-black/20 hover:bg-secondary hover:text-black text-black py-1 px-3 cursor-pointer ml-auto'
            >
              Medium
            </Link>
            <Link
              to={""}
              className='border border-black/20 bg-accent hover:bg-secondary hover:text-black text-white py-1 px-3 cursor-pointer ml-auto'
            >
              Large
            </Link>
          </div>
        </div>
        <p>
          Is a reminiscent of warm beach days, high notes of lemon palm and
          floral freesia to draw into the midst of warm coconut and sweet
          sugarcane. It ends with a luxury vetiver and hint of vanilla
          {/* {data?.description} */}
        </p>
      </div>
    </div>
  );
};

export default ViewProduct;
