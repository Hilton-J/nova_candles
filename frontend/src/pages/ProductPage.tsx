import { useLocation, useNavigate, useParams } from "react-router";
import { useGetProductByIdQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import { useState } from "react";
import { useAddToCartMutation } from "../slices/cartApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { extractErrorMessage } from "../utils/extractError";

type SizeOption = "small" | "medium" | "large";

const ProductPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<SizeOption>("large");
  const navigate = useNavigate();
  const location = useLocation();

  const { data: product, isLoading: isProductLoading } = useGetProductByIdQuery(
    id || ""
  );

  const [addCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!product || !selectedSize) return;

    const { _id, price, productName, fragrance, images } = product;

    const cartItem = {
      productId: _id,
      quantity,
      price: price[selectedSize],
      productName,
      fragrance,
      size: selectedSize,
      image: images[0],
    };


    try {
      await addCart(cartItem).unwrap();
      toast.success("Product added to Cart");
    } catch (err) {
      console.error(err);
      toast.error(extractErrorMessage(err));
    }
  };

  const handlePreviousImage = () => {
    if (product?.images?.length)
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product?.images.length - 1 : prevIndex - 1
      );
  };

  const handleNextImage = () => {
    if (product?.images?.length)
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product?.images.length - 1 ? 0 : prevIndex + 1
      );
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
      {isProductLoading ? (
        <Loader loading={isProductLoading} />
      ) : (
        <div className='container mx-auto px-4 py-12'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Product Images */}
            <div className='relative'>
              <div className='relative h-96 md:h-[500px] overflow-hidden rounded-lg bg-white border border-border'>
                <img
                  src={product?.images[currentImageIndex]}
                  alt={product?.productName}
                  className='w-full h-full object-cover'
                />

                {product?.images && product?.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors cursor-pointer'
                    >
                      <ChevronLeft className='h-6 w-6 text-candledark' />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors cursor-pointer'
                    >
                      <ChevronRight className='h-6 w-6 text-candledark' />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product?.images && product?.images.length > 1 && (
                <div className='flex mt-4 space-x-2'>
                  {product?.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-md overflow-hidden border ${
                        currentImageIndex === index
                          ? "border-candleamber"
                          : "border-border"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product?.productName} ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div>
              <h1 className='font-serif text-3xl font-medium text-candledark mb-2 capitalize'>
                {product?.productName}
              </h1>
              <p className='text-candleamber text-xl font-medium mb-6'>
                {selectedSize && product?.price?.[selectedSize] !== undefined
                  ? `R${product?.price[selectedSize].toFixed(2)}`
                  : "Select a size"}
              </p>
              <p className='text-candlegray mb-8'>{product?.description}</p>

              {/* Product Options */}
              <div className='space-y-6 mb-8'>
                {/* Size Selection for Candles */}
                {product?.type === "candle" && (
                  <div>
                    <h3 className='text-sm font-medium text-candledark mb-3'>
                      Size
                    </h3>
                    <div className='flex flex-wrap gap-3'>
                      {Object.keys(product?.price)
                        .filter((size) => size !== "default")
                        .map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size as SizeOption)}
                            className={`px-4 py-2 border rounded-md text-sm ${
                              selectedSize === size
                                ? "border-candleamber bg-candleamber text-white"
                                : "border-border text-candledark hover:border-candleamber cursor-pointer"
                            } transition-colors capitalize`}
                          >
                            {size}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                {/* Fragrance Selection for Linen Spray */}
                {/* {product?.type === "spray" && (
                  <div>
                    <h3 className='text-sm font-medium text-candledark mb-3'>
                      Fragrance
                    </h3>
                    <div className='flex flex-wrap gap-3'>
                      {fragranceOptions.map((fragrance) => (
                        <button
                          key={fragrance.id}
                          onClick={() => setSelectedFragrance(fragrance.name)}
                          className={`px-4 py-2 border rounded-md text-sm ${
                            selectedFragrance === fragrance.name
                              ? "border-candleamber bg-candleamber text-white"
                              : "border-border text-candledark hover:border-candleamber"
                          } transition-colors`}
                        >
                          {fragrance.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )} */}

                {/* Quantity Selector */}
                <div>
                  <h3 className='text-sm font-medium text-candledark mb-3'>
                    Quantity
                  </h3>
                  <div className='flex items-center  focus:border-candleamber'>
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className='w-10 h-10 border border-border rounded-l-md flex items-center justify-center hover:bg-secondary transition-colors  cursor-pointer'
                    >
                      <Minus className='h-4 w-4' />
                    </button>
                    <input
                      type='number'
                      min='1'
                      max='10'
                      value={quantity}
                      onChange={(e) =>
                        handleQuantityChange(parseInt(e.target.value) || 1)
                      }
                      className='w-16 h-10 border-y border-y-border border-x border-x-transparent text-center focus:outline-none '
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className='w-10 h-10 border border-border rounded-r-md flex items-center justify-center hover:bg-secondary transition-colors  cursor-pointer'
                    >
                      <Plus className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className='w-full py-3 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors'
              >
                Add to Cart
              </button>

              {/* Product Details */}
              <div className='mt-12 pt-8 border-t border-border'>
                <h3 className='font-medium text-candledark mb-4'>
                  Product Details
                </h3>
                <div className='space-y-4 text-sm text-candlegray'>
                  <p>
                    <span className='font-medium text-candledark'>
                      Material:
                    </span>{" "}
                    100% Soy Wax, Cotton Wick
                  </p>
                  <p>
                    <span className='font-medium text-candledark'>
                      Burn Time:
                    </span>{" "}
                    Small: 20-30 hours, Medium: 40-50 hours, Large: 60-70 hours
                  </p>
                  <p>
                    <span className='font-medium text-candledark'>
                      Ingredients:
                    </span>{" "}
                    Premium soy wax, cotton wick, natural fragrance oils
                  </p>
                  <p>
                    <span className='font-medium text-candledark'>Care:</span>{" "}
                    Trim wick to 1/4" before each use. Allow the wax to melt to
                    the edges on first burn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
