import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets'; // Assuming assets are correctly imported here
import { FaPlaneDeparture } from 'react-icons/fa'; // Using an icon for the highlight section

function Charters() {


  const charterTypesData = [
    {
      image: assets.private_jet_image,
      title: 'Private Jet Charters',
      description: 'Bypass commercial terminals with unparalleled luxury and convenience. Access exclusive FBOs and the finest private jets for a premium travel experience backed by professional service.',
    },
    {
      image: assets.air_ambulance_image,
      title: 'Air Ambulance Charters',
      description: 'Providing rapid and safe medical evacuation flights. Our specially equipped aircraft and focus on patient well-being ensure the highest standard of care during transport.',
    },
    {
      image: assets.hajj_umrah_image,
      title: 'HAJJ and Umrah Charters',
      description: 'Specialized expertise in HAJJ and Umrah travel. As a premier leasing broker, we manage aircraft charters for governments, carriers, and operators, ensuring seamless pilgrimage journeys.',
    },
    {
      image: assets.passenger_cargo_image,
      title: 'Passenger and Cargo Charter',
      description: 'Versatile solutions for passenger and cargo transport globally. We source the right aircraft and manage logistics efficiently, even to remote or challenging destinations, ensuring timely delivery.',
    },
  ];

  // Reusable animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="bg-gray-50 text-gray-800 overflow-x-hidden antialiased">
      {/* --- Hero Section --- */}
      <motion.div
        
        className="bg-gradient-to-br from-[#0a0f24] via-[#10183b] to-[#1c2a5e] text-white py-24 md:py-32 text-center"
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
            Aircraft Charters
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto"
             initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Your schedule, your destinations. Experience bespoke air travel tailored precisely to your needs.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16 md:space-y-24">

        {/* --- Introduction Section --- */}
        <motion.section
          className="text-center max-w-3xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fly Beyond Boundaries
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Jetstream International offers premier aircraft charter services, providing unparalleled flexibility, privacy, and efficiency. Whether for critical business meetings, luxury leisure travel, urgent cargo, or medical emergencies, we deliver customized solutions with meticulous attention to detail and safety.
          </p>
        </motion.section>


        {/* --- Charter Types Grid Section --- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 md:mb-14 text-center">
            Explore Our Charter Options
          </h2>
          {/* Adjusted grid columns for 4 items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {charterTypesData.map((service, index) => (
              <motion.div
                key={service.title}
                className="group rounded-lg bg-white shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                 {/* Image container - SQUARE */}
                <div className="w-full aspect-square overflow-hidden bg-gray-100">
                   <img
                     src={service.image} // Use the specific image key from data
                     alt={service.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                     aria-hidden="true"
                   />
                </div>
                 {/* Text content container */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Why Charter With Us Section --- */}
         <motion.section
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 md:p-16 rounded-xl text-center shadow-inner"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <FaPlaneDeparture className="text-4xl text-blue-500 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Charter With Jetstream?</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
               Benefit from our extensive global network, complete scheduling flexibility, uncompromising safety standards, absolute discretion, and dedicated 24/7 support. We tailor every charter flight to your exact requirements for a seamless journey.
            </p>
        </motion.section>


        {/* --- CTA Section --- */}
        <motion.section
          className="text-center py-16 md:py-20 bg-gradient-to-br from-[#0a0f24] to-[#1c2a5e] rounded-xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
           <div className="container mx-auto px-4">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                 Ready to Plan Your Charter?
             </h2>
             <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                 Contact our charter specialists today to discuss your travel plans, aircraft options, and receive a personalized, no-obligation quote.
             </p>
             <Link
                to="/contact-us" // Or a specific /quote route if you have one
                className="inline-block bg-white hover:bg-gray-100 text-blue-700 font-bold py-3 px-10 rounded-full text-lg transform transition duration-300 hover:scale-105 shadow-md hover:shadow-lg"
             >
               Request a Quote
             </Link>
           </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Charters;