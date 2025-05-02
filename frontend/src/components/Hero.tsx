import { Link } from "react-router";
// import hero from "../assets/images/hero1.jpg";

const Hero = () => {
  return (
    <section className='relative bg-hero-pattern'>
      <div className='container mx-auto px-4 py-20 md:py-32'>
        <div className='max-w-2xl'>
          <h1 className='font-serif text-4xl md:text-6xl font-medium text-candledark mb-6'>
            Illuminate Your Space with Handcrafted Candles
          </h1>
          <p className='text-candlegray text-lg mb-8 max-w-xl'>
            Discover our collection of artisanal candles and linen sprays made
            with natural ingredients and captivating fragrances.
          </p>
          <div className='flex flex-wrap gap-4'>
            <Link
              to='/shop'
              className='inline-flex items-center justify-center px-6 py-3 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors'
            >
              Shop Collection
            </Link>
            <Link
              to='/about'
              className='inline-flex items-center justify-center px-6 py-3 bg-transparent border border-candledark text-candledark rounded-md hover:bg-candledark hover:text-white transition-colors'
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent'></div>
    </section>
  );
};

export default Hero;
