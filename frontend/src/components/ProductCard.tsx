import { Link } from "react-router";
import { IProduct } from "../interfaces/interfaces";
import placeHolderPoster from "../assets/images/BlackRaspberryVanilla.webp";

const ProductCard = (props: IProduct) => {
  return (
    <Link
      to={`/products/${props.productName}/${props.size}`}
      className='border border-black/20 grid grid-rows-subgrid row-span-2 gap-2 hover:shadow capitalize '
    >
      <img
        src={
          props.images && props.images.length > 0
            ? props.images[0]
            : placeHolderPoster
        }
        alt={props.productName}
        className='size-full object-cover'
      />
      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className='flex justify-between'>
          {props.productName}
          <span className='font-bold'>R{props.price.toFixed(2)}</span>
        </div>
        {props.size}
      </div>
    </Link>
  );
};

export default ProductCard;
