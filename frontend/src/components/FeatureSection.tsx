import { Award, Flame, Leaf, ShieldCheck } from "lucide-react";

const FeatureSection = () => {
  return (
    <section className='py-16 bg-background'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='flex flex-col items-center text-center p-6'>
            <div className='bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-4'>
              <Flame className='h-8 w-8 text-candleamber' />
            </div>
            <h3 className='font-medium text-candledark text-lg mb-2'>
              100% Soy Wax
            </h3>
            <p className='text-candlegray text-sm'>
              Our candles are made with pure soy wax for a clean, long-lasting
              burn.
            </p>
          </div>

          <div className='flex flex-col items-center text-center p-6'>
            <div className='bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-4'>
              <Leaf className='h-8 w-8 text-candleamber' />
            </div>
            <h3 className='font-medium text-candledark text-lg mb-2'>
              Natural Ingredients
            </h3>
            <p className='text-candlegray text-sm'>
              We use only high-quality natural ingredients and essential oils.
            </p>
          </div>

          <div className='flex flex-col items-center text-center p-6'>
            <div className='bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-4'>
              <Award className='h-8 w-8 text-candleamber' />
            </div>
            <h3 className='font-medium text-candledark text-lg mb-2'>
              Handcrafted
            </h3>
            <p className='text-candlegray text-sm'>
              Each candle is handcrafted with care and attention to detail.
            </p>
          </div>

          <div className='flex flex-col items-center text-center p-6'>
            <div className='bg-secondary w-16 h-16 rounded-full flex items-center justify-center mb-4'>
              <ShieldCheck className='h-8 w-8 text-candleamber' />
            </div>
            <h3 className='font-medium text-candledark text-lg mb-2'>
              Eco-Friendly
            </h3>
            <p className='text-candlegray text-sm'>
              Sustainable packaging and eco-conscious production methods.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
