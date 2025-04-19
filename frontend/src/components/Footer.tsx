import { Link } from "react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className='bg-candlelight border-t border-black/20 pt-16 pb-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='md:col-span-1'>
            <Link
              to='/'
              className='font-cinzel text-2xl font-medium text-candledark'
            >
              Nova
            </Link>
            <p className='mt-4 text-candlegray text-sm'>
              Handcrafted candles made with love and care, bringing warmth and
              fragrance to your home.
            </p>
          </div>

          <div className='md:col-span-1'>
            <h3 className='font-medium text-candledark mb-4'>Shop</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/shop'
                  className='text-candlegray hover:text-candleamber text-sm transition-colors'
                >
                  All Candles
                </Link>
              </li>
              <li>
                <Link
                  to='/shop'
                  className='text-candlegray hover:text-candleamber text-sm transition-colors'
                >
                  Linen Spray
                </Link>
              </li>
              <li>
                <Link
                  to='/shop'
                  className='text-candlegray hover:text-candleamber text-sm transition-colors'
                >
                  Gift Sets
                </Link>
              </li>
            </ul>
          </div>

          <div className='md:col-span-1'>
            <h3 className='font-medium text-candledark mb-4'>Company</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to='/about'
                  className='text-candlegray hover:text-candleamber text-sm transition-colors'
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='text-candlegray hover:text-candleamber text-sm transition-colors'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-candlegray hover:text-candleamber text-sm transition-colors'
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div className='md:col-span-1'>
            <h3 className='font-medium text-candledark mb-4'>Connect</h3>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-candlegray hover:text-candleamber transition-colors'
              >
                <Instagram size={20} />
              </a>
              <a
                href='#'
                className='text-candlegray hover:text-candleamber transition-colors'
              >
                <Facebook size={20} />
              </a>
              <a
                href='#'
                className='text-candlegray hover:text-candleamber transition-colors'
              >
                <Twitter size={20} />
              </a>
            </div>
            <div className='mt-4'>
              <h4 className='font-medium text-candledark text-sm mb-2'>
                Subscribe to our newsletter
              </h4>
              <div className='flex'>
                <input
                  type='email'
                  placeholder='Your email'
                  className='px-3 py-2 bg-white border border-black/20 rounded-l-md text-sm focus:outline-none focus:ring-1 focus:ring-candleamber w-full'
                />
                <button className='bg-candleamber text-white px-3 py-2 rounded-r-md text-sm hover:bg-candleamber/80 cursor-pointer transition-colors'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 pt-6 border-t border-black/20 text-center'>
          <p className='text-candlegray text-xs'>
            © {new Date().getFullYear()} Nova Candles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
