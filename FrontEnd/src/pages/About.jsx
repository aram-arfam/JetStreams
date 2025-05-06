import React from 'react';
import { FaShieldAlt, FaUserCheck, FaStar, FaHeart, FaLightbulb, FaUsers, FaRoute } from 'react-icons/fa'; // Added FaRoute
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion

function About() {
  const coreValues = [
    {
      icon: FaShieldAlt,
      title: 'Safety',
      description: 'We operate with uncompromising safety standards, ensuring secure training and flight environments at all times.',
    },
    {
      icon: FaUserCheck,
      title: 'Integrity',
      description: 'We stand by honesty, accountability, and ethical conduct in every decision and interaction.',
    },
    {
      icon: FaStar,
      title: 'Excellence',
      description: 'We pursue excellence relentlessly—setting benchmarks in aviation training and service quality.',
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'A genuine love for aviation and a strong commitment to people power every step we take.',
    },
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We lead with creativity, leveraging the latest technologies and modern pedagogy to redefine flight training.',
    },
    {
      icon: FaUsers,
      title: 'Teamwork',
      description: 'We thrive on collaboration, building strong bonds between students, instructors, and every member of our community.',
    },
  ];

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for cards (staggered)
  const cardVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: (i) => ({ // Custom function to allow staggering
          opacity: 1,
          scale: 1,
          transition: {
              delay: i * 0.1, // Stagger delay based on index
              duration: 0.4,
              ease: "easeOut"
          }
      })
  };


  return (
    // Added overflow-x-hidden to prevent scrollbars from animations and antialiased for smoother fonts
    <div className="bg-gray-50 text-gray-800 overflow-x-hidden antialiased">
      {/* --- Hero Section --- */}
      {/* Added subtle gradient, increased padding, animated */}
      <motion.div
      
        className="bg-gradient-to-br from-[#0a0f24] to-[#1c2a5e] text-white py-24 md:py-32 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-200"
             initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Discover the Jetstream International Difference
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16 md:space-y-24">
        {/* --- Introduction Section --- */}
        {/* Animated section, adjusted text styling */}
        <motion.section
          className="text-center max-w-3xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible" // Animate when section enters viewport
          viewport={{ once: true, amount: 0.3 }} // Trigger animation once, when 30% is visible
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Jetstream International
          </h2>
          <p className="text-xl text-yellow-500 font-semibold leading-relaxed mb-6">
            Standing out from the rest!
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We re-define the global aviation standards while giving emphasis to the smallest details while tackling the biggest challenges in our industry. Our company leaders come with loads of expertise in the aviation and hospitality industry with more than 25 years of experience.
          </p>
        </motion.section>

        {/* --- Mission and Vision Section --- */}
        {/* Animated section, enhanced card styling with borders and shadows */}
        <motion.section
          className="grid md:grid-cols-2 gap-10 md:gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-base"> {/* Slightly smaller text */}
              The company founded post pandemic in 2022, when the aviation world keeps facing many challenges our leaders believe that this is just another phase to a new chapter in the world of aviation. And with this enthusiasm we have started our business to serve our clients with impeccable, unique, transparent, tailor-made services.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed text-base"> {/* Slightly smaller text */}
              Any time you need us we will be there with our 24/7 support team based and HDQ in Dubai & branch office in India. With plans to open more offices worldwide by 2023 to support our over-growing clientele. The paths we pave together lead to limitless possibility. And the bonds we form propel us all higher again and again. While evolving our services to meet client expectations and market challenges.
            </p>
          </div>
        </motion.section>

        {/* --- The Path Section --- */}
        {/* Animated section, added icon, refined background and padding */}
        <motion.section
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 md:p-16 rounded-xl text-center shadow-inner"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
             <FaRoute className="text-4xl text-blue-500 mx-auto mb-4" />
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Path We Pave</h2>
             <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
               With such enormous exposure to overfly and landing permit, Ground Handling, flight planning, and Fuel Prices besides others we are always at your back and call “ROUND THE CLOCK AND ALL CALENDAR DATE” so as to efficiently tackle your aviation needs on top priority with fervent and fond hope of serving you always.
             </p>
        </motion.section>

        {/* --- Core Values Section --- */}
        {/* Animated section, enhanced card hover effects, icon styling, staggered animation */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger slightly earlier for grid
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 md:mb-14 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => ( // Added index for stagger animation
              <motion.div
                key={value.title}
                className="group flex items-start space-x-4 p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-xl hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
                custom={index} // Pass index to variants
                variants={cardVariants}
                initial="hidden"
                whileInView="visible" // Animate cards as they come into view
                viewport={{ once: true, amount: 0.5 }} // Individual card animation trigger
              >
                {/* Enhanced icon styling */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
                   <value.icon className="text-#0a0f24 text-2xl group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- CTA Section --- */}
        {/* Animated section, more vibrant gradient, white text, enhanced button */}
        <motion.section
          className="text-center py-16 md:py-20 bg-gradient-to-br from-[#0a0f24] to-[#1c2a5e] rounded-xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
           <div className="container mx-auto px-4">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                 Ready to Elevate Your Experience?
             </h2>
             <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                 Explore our comprehensive range of aviation services and discover how Jetstream International can support your needs.
             </p>
             <Link
                to="/services"
                className="inline-block bg-white hover:bg-gray-100 text-blue-700 font-bold py-3 px-10 rounded-full text-lg transform transition duration-300 hover:scale-105 shadow-md hover:shadow-lg"
             >
               Explore Our Services
             </Link>
           </div>
        </motion.section>
      </div>
    </div>
  );
}

export default About;