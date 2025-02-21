import hero from "../assets/images/hero1.jpg";
const Hero = () => {
  return (
    <section className='mb-15 space-y-10 md:space-y-20'>
      <div className=' grid md:grid-cols-2 items-center'>
        <div className='space-y-5 md:w-[80%] lg:w-[75%] xl:w-[80%] 2xl:w-[90%]'>
          <h1 className='md:text-[2rem] lg:text-[2.9rem] xl:text-[3.5rem] 2xl:text-[5rem] md:leading-9 lg:leading-12 xl:leading-none'>
            Handcrafted Elegance For Every Moment
          </h1>
          <p className='text-black/70 md:text-[0.8rem] lg:text-[1.1rem] xl:text-[1.4rem] 2xl:text-[1.9rem]'>
            What Makes Us Different? Every candle is a blend of artistry and
            sincerity, hand-poured with care to bring warmth and light to your
            moments.
          </p>
        </div>
        <div className=''>
          <img src={hero} alt='' className='w-full h-auto object-cover' />
        </div>
      </div>
      <div className='grid md:grid-cols-2'>
        <h1 className='md:text-[1.7rem] lg:text-4xl xl:text-[3rem] 2xl:text-[4rem] w-[90%]'>
          Natural And Sustainably Sourced Soy Candles
        </h1>
        <p className='text-black/70 md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.2rem] 2xl:text-[1.5rem]'>
          Join countless others who have discovered the beauty of soy candles.
          Made from natural and sustainable ingredients; our candles offer a
          clean, long-lasting burn, free from harmful chemicals. Because you
          deserve a candle that&apos;s as kind to the planet as it is to your
          home.
        </p>
      </div>
    </section>
  );
};

export default Hero;
