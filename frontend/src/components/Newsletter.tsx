const Subscribe = () => {
  return (
    <section className='py-16 bg-hero-pattern'>
      <div className='container mx-auto px-4'>
        <div className='max-w-xl mx-auto text-center'>
          <h2 className='font-serif text-2xl font-medium text-candledark mb-4'>
            Join Our Community
          </h2>
          <p className='text-candlegray mb-6'>
            Subscribe to our newsletter for exclusive offers, new product
            launches, and candle care tips.
          </p>
          <div className='flex flex-col sm:flex-row gap-2'>
            <input
              type='email'
              placeholder='Your email address'
              className='flex-grow px-4 py-3 bg-white border border-black/20 rounded-md focus:outline-none focus:ring-1 focus:ring-candleamber'
            />
            <button className='px-6 py-3 bg-candleamber text-white rounded-md hover:bg-candleamber/80 transition-colors'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
