import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const slides = [
    {
      image: assets.charter_slider,
      text: "Charter Services",
      colors: ["#FFBF00", "#fff"],
      size: [80, 50],
      link: "/charters",
    },
    {
      image: assets.ground_handling_slider,
      text: "Ground Handling and Supervision",
      colors: ["#FFBF00", "#FFBF00", "#fff", "#FFBF00"],
      size: [80, 80, 50, 80],
      link: "/ground-handling",
    },
    {
      image: assets.home_slider,
      text: "Fuel Arrangement",
      colors: ["#FFBF00", "#fff"],
      size: [80, 50],
      link: "/fuel-arrangement",
    },
    {
      image: assets.flight_planning_slider,
      text: "Flight Planning and Dispatch",
      colors: ["#FFBF00", "#FFBF00", "#fff", "#FFBF00"],
      size: [80, 80, 50, 80],
      link: "/flights-planning",
    },
    {
      image: assets.permits_slider,
      text: "Permits And Navigation",
      colors: ["#FFBF00", "#FFF", "#FFBF00"],
      size: [80, 50, 80],
      link: "/permits-navigation",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="relative w-full h-screen">
      <Swiper
        direction="vertical"
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="h-full"
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay to ensure readability */}
              <div className="absolute inset-0 bg-black/30"></div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12">
                <div className="bg-white/5 px-6 py-4 sm:px-10 sm:py-6 rounded-2xl shadow-lg">
                  {/* Main Text */}
                  {slide.text.split(" ").map((word, i) => (
                    <motion.span
                      key={`${currentSlide}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.5 }}
                      style={{
                        color: slide.colors[i % slide.colors.length],
                        fontSize: slide.size
                          ? `${slide.size[i % slide.size.length]}px`
                          : "40px",
                        fontWeight: "700",
                        textShadow: "2px 2px 10px rgba(0,0,0,0.7)",
                      }}
                      className="inline-block mx-1 sm:text-5xl text-3xl"
                    >
                      {word}
                    </motion.span>
                  ))}

                  {/* Subtext */}
                  <p className="text-md sm:text-lg text-gray-300 mt-2 sm:mt-4">
                    Explore seamless and top-tier aviation services for all your
                    travel needs.
                  </p>

                  {/* Button - Adjusted for responsiveness */}
                  <Link
                    to={slide.link}
                    className="mt-4 sm:mt-6 inline-block bg-yellow-500 text-black text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-yellow-600 transition duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
