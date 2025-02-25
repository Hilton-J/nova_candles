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
      <div className='grid grid-cols-4 mt-10 gap-10'>
        <Link to={"https://www.instagram.com/p/C6MM-aQtu67/"} target="_blank">
          <img src={image4} alt='Intagram post' className='size-full' />
        </Link>

        <img src={image1} alt='Intagram post' className='size-full' />
        <img src={image2} alt='Intagram post' className='size-full' />
        <img src={image3} alt='Intagram post' className='size-full' />
      </div>
    </section>
  );
};

export default Instagram;
