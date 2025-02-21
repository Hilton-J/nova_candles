interface Props {
  image: string;
  title: string;
  id: string;
  index: number;
  size: string;
  price: number;
}

const ProductCard = (props: Props) => {
  return (
    <div key={props.index}>
      <img src={props.image} alt={props.title} />
      <div>
        {props.id}
        {props.title}
        {props.price}
      </div>
      {props.size}
    </div>
  );
};

export default ProductCard;
