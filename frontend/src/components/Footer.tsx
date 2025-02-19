import { Link } from "react-router";

const Footer = () => {
  return (
    <div className='flex flex-col items-center gap-12'>
      <div className='flex items-center gap-9'>
        <Link to='/'>
          <h1 className='font-cinzel text-accent text-lg md:text-3xl xl:text-4xl font-bold'>
            NOVA
          </h1>
        </Link>
        <Link
          to='mailto:novapremiumcandles@gmail.com'
          className='hover:text-accent text-xl'
        >
          novapremiumcandles@gmail.com
        </Link>
      </div>
      <div className='flex gap-16'>
        <Link
          to={"/contact"}
          className='hover:text-accent text-sm xl:text-xl 2xl:text-2xl'
        >
          CONTACT
        </Link>
        <Link
          to={"/tsncss"}
          className='hover:text-accent text-sm xl:text-xl 2xl:text-2xl'
        >
          TERMS AND CONDITIONS
        </Link>
        <Link
          to={"/shipping"}
          className='hover:text-accent text-sm xl:text-xl 2xl:text-2xl'
        >
          SHIPPING & RETURNS
        </Link>
      </div>
    </div>
  );
};

export default Footer;
