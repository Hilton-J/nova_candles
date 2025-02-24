import { Link } from "react-router";
import { IProduct } from "../interfaces/interfaces";
import placeHolderPoster from "../assets/images/BlackRaspberryVanilla.webp";

const ProductCard = (props: IProduct) => {
  return (
    <Link
      key={props._id}
      to={`/products/${props._id}`}
      className='border border-black/20 grid grid-rows-subgrid row-span-3 gap-0 hover:shadow '
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
      <div className='flex justify-between'>
        {props.productName}
        <span>{props.price}</span>
      </div>
      {props.size}
    </Link>
  );
};

export default ProductCard;
