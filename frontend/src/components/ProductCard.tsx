import { Link } from "react-router";
import { IProduct } from "../interfaces/interfaces";
// import placeHolderPoster from "../assets/images/BlackRaspberryVanilla.webp";

const ProductCard = (props: IProduct) => {
  const basePrice = props.type === "candle" ? props.price.large : 125;
  return (
    <Link
      to={`/product/${props._id}`}
      className='group flex flex-col h-full bg-white rounded-lg overflow-hidden border border-border hover:shadow-md transition-all duration-300'
    >
      <div className='relative h-64 overflow-hidden'>
        <img
          src={props.images[0]}
          alt={props.productName}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      </div>

      <div className='p-4 flex flex-col flex-grow'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='font-serif text-lg font-medium text-candledark group-hover:text-candleamber transition-colors capitalize'>
            {props.productName}
          </h3>
          <span className='text-candleamber font-medium'>
            R{basePrice.toFixed(2)}
          </span>
        </div>

        <p className='text-candlegray text-sm mb-3 capitalize'>
          {props.fragrance}
        </p>

        <div className='mt-auto'>
          <span className='inline-block py-2 px-4 bg-secondary text-sm rounded-md hover:bg-candleamber hover:text-white transition-colors duration-300'>
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
