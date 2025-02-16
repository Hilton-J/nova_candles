import image from "../assets/images/section.webp";

const Section = () => {
  return (
    <section className='space-y-15'>
      <div className='grid grid-cols-2'>
        <h1 className="text-[2.5rem]">Natural And Sustainably Sourced Soy Candles</h1>
        <p className="text-black/70">
          Join countless others who have discovered the beauty of soy candles.
          Made from natural and sustainable ingredients; our candles offer a
          clean, long-lasting burn, free from harmful chemicals. Because you
          deserve a candle that&apos;s as kind to the planet as it is to your home.
        </p>
      </div>
      <div className="grid grid-cols-2">
        <div className='bg-secondary p-10'>
          <img src={image} alt='Image' />
        </div>
        <div className="bg-accent text-white flex flex-col items-center justify-center px-16">
          <h1 className="text-[3.5rem] leading-14 mb-10">The Art Of Warmth And Light</h1>
          <p className="">
            Transform your space with the gentle glow and soothing scents of our
            soy candles. Designed to create a calm and inviting atmosphere,
            they&apos;re perfect for any occasion-from quiet nights to lively
            gatherings.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section;
