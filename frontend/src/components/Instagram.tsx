import { Link } from "react-router";
import image1 from "../assets/images/image 1.png";
import image2 from "../assets/images/image 2.png";
import image3 from "../assets/images/image 3.png";
import image4 from "../assets/images/image 4.png";

const Instagram = () => {
  return (
    <section className='flex flex-col items-center mt-15 gap-3'>
      <h1 className='2xl:text-5xl'>Follow @novasoycandles on Instagram</h1>
      <p className='text-black/70 2xl:text-2xl'>
        Follow Us{" "}
        <span>
          <Link
            to={
              "https://www.instagram.com/novasoycandles?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            }
            target='_blank'
            className='hover:text-accent'
          >
            @novasoycandles
          </Link>
        </span>
      </p>
      <div className='grid grid-cols-4 mt-10'>
        <img src={image1} alt='Intagram post' />
        <img src={image2} alt='Intagram post' />
        <img src={image3} alt='Intagram post' />
        <img src={image4} alt='Intagram post' />
      </div>
    </section>
  );
};

export default Instagram;
