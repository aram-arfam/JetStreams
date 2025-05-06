import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const HeroImg = () => {
  return (
    <div className="relative mt-1 w-full h-[400px] md:h-[600px] overflow-hidden flex items-center">
      <motion.img
        src={assets.plane_hero}
        alt="Airplane"
        className="absolute " // Image size scales properly
        animate={{
          x: ["100vw", "-80vw"], // Moves fully across the screen
        }}
        transition={{
          ease: "linear", // Smooth movement
          duration: 10, // Adjust speed (higher = slower)
          repeat: Infinity, // Loops forever
        }}
      />
    </div>
  );
};

export default HeroImg;
