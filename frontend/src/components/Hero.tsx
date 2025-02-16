import hero from "../assets/images/Hero.webp";
const Hero = () => {
  return (
    <section className='flex mb-15 items-center gap-32'>
      <div className="flex-1">
        <h1 className="text-5xl">Handcrafted Elegance For Every Moment</h1>
        <p className="text-black/70">
          What Makes Us Different? Every candle is a blend of artistry and
          sincerity, hand-poured with care to bring warmth and light to your
          moments.
        </p>
      </div>
      <div className="">
        <img src={hero} alt='' className=""/>
      </div>
    </section>
  );
};

export default Hero;
