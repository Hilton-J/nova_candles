const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className='bg-hero-pattern py-16'>
        <div className='container mx-auto px-4 text-center'>
          <h1 className='font-serif text-4xl md:text-5xl font-medium text-candledark mb-6'>
            Our Story
          </h1>
          <p className='text-candlegray max-w-2xl mx-auto'>
            Discover the passion and craftsmanship behind GlowWick
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16'>
            <img
              src='https://images.unsplash.com/photo-1603006905393-c08cef19f243?q=80&w=687&auto=format&fit=crop'
              alt='Handcrafted candles'
              className='rounded-lg shadow-md'
            />
            <div>
              <h2 className='font-serif text-3xl font-medium text-candledark mb-6'>
                Crafted with Passion
              </h2>
              <p className='text-candlegray mb-6'>
                GlowWick began in 2018 in a small home kitchen, born from a
                passion for creating beautiful, fragrant candles that bring
                warmth and atmosphere to any space. What started as a hobby
                quickly grew into something much more meaningful.
              </p>
              <p className='text-candlegray'>
                Our founder, Sarah, discovered her love for candle-making after
                searching for clean-burning, natural candles free from harmful
                chemicals. Unable to find exactly what she wanted, she began
                crafting her own using pure soy wax, cotton wicks, and premium
                essential oils.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16'>
            <div className='order-2 md:order-1'>
              <h2 className='font-serif text-3xl font-medium text-candledark mb-6'>
                Our Philosophy
              </h2>
              <p className='text-candlegray mb-6'>
                At GlowWick, we believe that candles should be more than just
                decor—they should create experiences. Each of our products is
                carefully handcrafted in small batches to ensure quality and
                attention to detail.
              </p>
              <p className='text-candlegray'>
                Our passion for quality ingredients and sustainable practices
                drives everything we do, from selecting premium soy wax to using
                recyclable packaging materials. We're committed to creating
                products that are as kind to the environment as they are
                beautiful in your home.
              </p>
            </div>
            <img
              src='https://images.unsplash.com/photo-1636668788726-33996455935c?q=80&w=687&auto=format&fit=crop'
              alt='Candle making process'
              className='rounded-lg shadow-md order-1 md:order-2'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
            <img
              src='https://images.unsplash.com/photo-1603006905393-c08cef19f243?q=80&w=687&auto=format&fit=crop'
              alt='Natural ingredients'
              className='rounded-lg shadow-md'
            />
            <div>
              <h2 className='font-serif text-3xl font-medium text-candledark mb-6'>
                Our Materials
              </h2>
              <p className='text-candlegray mb-6'>
                We source only the finest natural ingredients for our candles.
                Our soy wax comes from U.S.-grown soybeans and is 100% renewable
                and biodegradable. We use cotton wicks that are lead and
                zinc-free to ensure a clean, even burn.
              </p>
              <p className='text-candlegray'>
                Our fragrances are a carefully curated blend of essential oils
                and premium fragrance oils that are phthalate-free. Each scent
                is rigorously tested to ensure it provides a beautiful aroma
                that fills your space without being overwhelming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className='py-16 bg-candlelight'>
        <div className='container mx-auto px-4'>
          <h2 className='font-serif text-3xl font-medium text-candledark mb-12 text-center'>
            Our Values
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-lg shadow-sm'>
              <div className='bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-candleamber'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
                  />
                </svg>
              </div>
              <h3 className='font-serif text-xl font-medium text-candledark mb-4 text-center'>
                Quality
              </h3>
              <p className='text-candlegray text-center'>
                We never compromise on the quality of our ingredients or our
                craftsmanship. Each candle is individually poured and checked to
                ensure it meets our high standards.
              </p>
            </div>

            <div className='bg-white p-8 rounded-lg shadow-sm'>
              <div className='bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-candleamber'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                  />
                </svg>
              </div>
              <h3 className='font-serif text-xl font-medium text-candledark mb-4 text-center'>
                Sustainability
              </h3>
              <p className='text-candlegray text-center'>
                We're committed to sustainable practices and minimizing our
                environmental footprint. From our ingredients to our packaging,
                we make choices with the planet in mind.
              </p>
            </div>

            <div className='bg-white p-8 rounded-lg shadow-sm'>
              <div className='bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-8 w-8 text-candleamber'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                  />
                </svg>
              </div>
              <h3 className='font-serif text-xl font-medium text-candledark mb-4 text-center'>
                Community
              </h3>
              <p className='text-candlegray text-center'>
                We believe in creating products that bring people together. Our
                candles are designed to enhance moments of connection,
                relaxation, and joy in your everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16 bg-background'>
        <div className='container mx-auto px-4'>
          <h2 className='font-serif text-3xl font-medium text-candledark mb-12 text-center'>
            Meet Our Team
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='mb-4 relative w-48 h-48 mx-auto'>
                <div className='absolute inset-0 rounded-full bg-candlebeige'></div>
                <img
                  src='https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
                  alt='Sarah Johnson'
                  className='relative rounded-full w-full h-full object-cover border-4 border-white'
                />
              </div>
              <h3 className='font-serif text-xl font-medium text-candledark mb-1'>
                Sarah Johnson
              </h3>
              <p className='text-candleamber mb-3'>
                Founder & Creative Director
              </p>
              <p className='text-candlegray max-w-sm mx-auto'>
                With a background in art and aromatherapy, Sarah brings a unique
                perspective to candle making, combining beautiful aesthetics
                with therapeutic scent combinations.
              </p>
            </div>

            <div className='text-center'>
              <div className='mb-4 relative w-48 h-48 mx-auto'>
                <div className='absolute inset-0 rounded-full bg-candlebeige'></div>
                <img
                  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
                  alt='Michael Chen'
                  className='relative rounded-full w-full h-full object-cover border-4 border-white'
                />
              </div>
              <h3 className='font-serif text-xl font-medium text-candledark mb-1'>
                Michael Chen
              </h3>
              <p className='text-candleamber mb-3'>Production Manager</p>
              <p className='text-candlegray max-w-sm mx-auto'>
                Michael oversees the production process, ensuring each candle
                meets our high standards. His attention to detail and passion
                for craftsmanship shine through in every product.
              </p>
            </div>

            <div className='text-center'>
              <div className='mb-4 relative w-48 h-48 mx-auto'>
                <div className='absolute inset-0 rounded-full bg-candlebeige'></div>
                <img
                  src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
                  alt='Olivia Martinez'
                  className='relative rounded-full w-full h-full object-cover border-4 border-white'
                />
              </div>
              <h3 className='font-serif text-xl font-medium text-candledark mb-1'>
                Olivia Martinez
              </h3>
              <p className='text-candleamber mb-3'>Fragrance Specialist</p>
              <p className='text-candlegray max-w-sm mx-auto'>
                With a trained nose and years of experience in perfumery, Olivia
                creates our signature scent blends, carefully balancing notes to
                create complex, inviting fragrances.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
