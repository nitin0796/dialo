import Image from "next/image";
import Link from "next/link";
import HeroImg from "../public/hero-img-3.png"

const Hero = () => {
  return (
    <div className="min-h-[70vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 bg-white px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-0 text-black">

      {/* Text Content */}
      <div className="w-full md:w-1/2 max-w-2xl text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4">
          Step into Timeless Style
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 leading-relaxed">
          Step into a world of timeless elegance with Dialo. We create premium
          leather footwear that blends traditional craftsmanship with
          contemporary design. Each pair tells a story of quality,
          comfort, and effortless style. Discover your perfect pair today.
        </p>
        <Link href={"#product"} className="inline-block mt-4 md:mt-8">
          <button className="bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-gray-800 transition-colors text-sm sm:text-base cursor-pointer">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px] aspect-square">
          <Image 
            src={HeroImg} 
            alt="Hero Image" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;