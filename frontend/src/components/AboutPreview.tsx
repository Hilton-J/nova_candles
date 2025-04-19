import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='relative'>
            <img
              src='https://images.unsplash.com/photo-1603006905393-c08cef19f243?q=80&w=687&auto=format&fit=crop'
              alt='Candle making process'
              className='rounded-lg w-full h-auto shadow-md'
            />
            <div className='absolute -bottom-6 -right-6 w-32 h-32 bg-candle-glow'></div>
          </div>

          <div>
            <h2 className='font-serif text-3xl font-medium text-candledark mb-6'>
              Handcrafted with Love and Care
            </h2>
            <p className='text-candlegray mb-6'>
              At GlowWick, we believe that candles should be more than just
              decor—they should create experiences. Each of our products is
              carefully handcrafted in small batches to ensure quality and
              attention to detail.
            </p>
            <p className='text-candlegray mb-8'>
              Our passion for quality ingredients and sustainable practices
              drives everything we do, from selecting premium soy wax to using
              recyclable packaging materials.
            </p>
            <Link
              to='/about'
              className='inline-flex items-center justify-center px-6 py-3 bg-transparent border border-candledark text-candledark rounded-md hover:bg-candledark hover:text-white transition-colors'
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
