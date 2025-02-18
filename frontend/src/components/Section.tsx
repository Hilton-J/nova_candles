import image from "../assets/images/section.webp";

const Section = () => {
  return (
    <section className='space-y-15'>
      <div className="grid md:grid-cols-2">
        <div className='bg-secondary md:p-7 lg:p-10 2xl:p-15'>
          <img src={image} alt='Image' className="w-full"/>
        </div>
        <div className="bg-accent text-white flex flex-col items-center justify-center md:px-10 lg:px-20 xl:px-25">
          <h1 className="md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl lg:mb-5 xl:mb-10 ">The Art Of Warmth And Light</h1>
          <p className="text-white/80 md:text-[0.8rem] lg:text-sm xl:text-lg 2xl:text-[1.5rem]">
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
