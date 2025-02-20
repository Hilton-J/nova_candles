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

// CHATGPT
// import hero from "../assets/images/hero1.jpg";

// const Hero = () => {
//   return (
//     <section className="mb-15 space-y-10 md:space-y-20">
//       <div className="grid md:grid-cols-2 items-center gap-10">
//         <div className="space-y-5 max-w-[90%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[80%] 2xl:max-w-[90%]">
//           <h1 className="text-[2rem] md:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.5rem] 2xl:text-[5rem] leading-tight md:leading-snug lg:leading-normal">
//             Handcrafted Elegance For Every Moment
//           </h1>
//           <p className="text-black/70 text-[1rem] md:text-[0.9rem] lg:text-[1.1rem] xl:text-[1.4rem] 2xl:text-[1.9rem]">
//             What Makes Us Different? Every candle is a blend of artistry and
//             sincerity, hand-poured with care to bring warmth and light to your
//             moments.
//           </p>
//         </div>
//         <div className="flex justify-center">
//           <img src={hero} alt="Handcrafted Candles" className="h-auto max-w-full object-cover" />
//         </div>
//       </div>
//       <div className="grid md:grid-cols-2 gap-10">
//         <h1 className="text-[1.7rem] md:text-[1.9rem] lg:text-4xl xl:text-[3rem] 2xl:text-[4rem] max-w-[90%]">
//           Natural And Sustainably Sourced Soy Candles
//         </h1>
//         <p className="text-black/70 text-[1rem] md:text-[0.9rem] lg:text-[1rem] xl:text-[1.2rem] 2xl:text-[1.5rem]">
//           Join countless others who have discovered the beauty of soy candles.
//           Made from natural and sustainable ingredients; our candles offer a
//           clean, long-lasting burn, free from harmful chemicals. Because you
//           deserve a candle that&apos;s as kind to the planet as it is to your
//           home.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Hero;

//GEMINI
// import hero from "../assets/images/hero1.jpg";
// const Hero = () => {
//   return (
//     <section className='mb-15 space-y-10 md:space-y-20'>
//       <div className=' grid md:grid-cols-2 items-center'>
//         <div className='space-y-5 md:max-w-3xl'> {/* Using max-w-3xl for consistent width */}
//           <h1 className='text-[2rem] md:text-[2rem] lg:text-[2.9rem] xl:text-[3.5rem] 2xl:text-[5rem] md:leading-9 lg:leading-12 xl:leading-none'>
//             Handcrafted Elegance For Every Moment
//           </h1>
//           <p className='text-black/70 text-[0.8rem] md:text-[0.8rem] lg:text-[1.1rem] xl:text-[1.4rem] 2xl:text-[1.9rem]'>
//             What Makes Us Different? Every candle is a blend of artistry and
//             sincerity, hand-poured with care to bring warmth and light to your
//             moments.
//           </p>
//         </div>
//         <div className=''>
//           <img src={hero} alt='' className='w-full h-auto object-cover' />
//         </div>
//       </div>
//       <div className='grid md:grid-cols-2'>
//         <h1 className='text-[1.7rem] md:text-[1.7rem] lg:text-4xl xl:text-[3rem] 2xl:text-[4rem] w-[90%]'>
//           Natural And Sustainably Sourced Soy Candles
//         </h1>
//         <p className='text-black/70 text-[0.8rem] md:text-[0.8rem] lg:text-[0.95rem] xl:text-[1.2rem] 2xl:text-[1.5rem]'>
//           Join countless others who have discovered the beauty of soy candles.
//           Made from natural and sustainable ingredients; our candles offer a
//           clean, long-lasting burn, free from harmful chemicals. Because you
//           deserve a candle that&apos;s as kind to the planet as it is to your
//           home.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Hero;