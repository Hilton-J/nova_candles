const Card = ({
  image,
  title,
  id,
  index,
  size,
  price,
}: {
  image: string;
  title: string;
  id: string;
  index: number;
  size: string;
  price: number;
}) => {
  return (
    <div key={index}>
      <img src={image} alt={title} />
      <div>
        {id}
        {title}
        {price}
      </div>
      {size}
    </div>
  );
};

export default Card;
