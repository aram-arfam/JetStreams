import { assets } from "../assets/assets";

const AboutHome = () => {
  return (
    <section className="w-full px-6 py-12 flex flex-col lg:flex-row items-center justify-center gap-10">
      {/* Text Section */}
      <div className="flex flex-col max-w-2xl text-center lg:text-left">
        <h2 className="text-xl md:text-2xl font-bold text-yellow-500">
          What will you get
        </h2>
        <h1 className="text-3xl md:text-4xl font-semibold text-white mt-2 leading-snug">
          Jetstream International will save your time with excellent services
        </h1>
        <p className="text-sm md:text-base text-gray-300 mt-4">
          JSID offers world-class international trip support and charter
          services for our clients who demand excellent quality. Our expert team
          matches your requirements and delivers 24/7 global support to meet
          your needs efficiently.
        </p>
      </div>

      {/* Image Section */}
      <div className="relative w-full max-w-md md:max-w-lg">
        <img
          src={assets.about_us_home}
          alt="About Us"
          className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-md"
        />

        {/* Text Box on Image */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 bg-[#AA3F44] px-4 py-6 md:px-6 md:py-8 rounded-md shadow-lg">
          <p className="text-base md:text-lg font-semibold text-white text-center">
            27 Years
          </p>
          <p className="text-base md:text-lg font-bold text-yellow-500 text-center">
            Of Experience
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHome;
