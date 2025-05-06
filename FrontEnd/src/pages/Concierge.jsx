import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets'; // Assuming assets are correctly imported here

function Concierge() {

  // Define the concierge services data using images
  const conciergeServicesData = [
    {
      image: assets.hotel_arrangement_image,
      title: 'Hotel Arrangements',
      description: 'Securing comfortable and convenient accommodations for your crew and passengers at preferred rates.',
    },
    {
      image: assets.transportation_image,
      title: 'Ground Transportation',
      description: 'Organizing reliable ground transfers, including chauffeur services, car rentals, and shuttle services.',
    },
    {
      image: assets.visa_assistance_image,
      title: 'Visa Assistance',
      description: 'Providing support and guidance for obtaining necessary visas for crew and passengers during international trips.',
    },
    {
      image: assets.vip_handling_image,
      title: 'VIP Handling',
      description: 'Arranging exclusive VIP services, including private lounges, expedited customs/immigration, and personal escorts.',
    },
    {
      image: assets.security_services_image,
      title: 'Security Arrangements',
      description: 'Coordinating enhanced security services tailored to your specific needs and itinerary.',
    },
    {
      image: assets.event_planning_image,
      title: 'Event Planning',
      description: 'Assisting with planning and coordinating special events, meetings, or leisure activities at your destination.',
    },
    {
      image: assets.leisure_activities_image,
      title: 'Leisure Activities',
      description: 'Booking restaurant reservations, tours, and other recreational activities for crew and passengers.',
    },
    {
      image: assets.personal_shopping_image,
      title: 'Personal Shopping & Errands',
      description: 'Handling personal requests, shopping needs, and other errands to save valuable time for crew and passengers.',
    },
    {
      image: assets.communication_support_image,
      title: 'Communication & Connectivity',
      description: 'Ensuring seamless communication and connectivity options during layovers.',
    }
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
      {/* --- Hero Section (No changes needed) --- */}
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
            Aviation Concierge
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto"
             initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Elevating your travel experience with personalized and seamless support, on the ground and beyond.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16 md:space-y-24">

        {/* --- Introduction Section (No changes needed) --- */}
        <motion.section
          className="text-center max-w-3xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Your Personal Aviation Assistant
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our dedicated aviation concierge service is designed to provide exceptional support, handling every detail of your trip logistics and personal needs. We ensure maximum comfort, convenience, and efficiency for both crew and passengers, allowing you to relax and focus on your journey.
          </p>
        </motion.section>


        {/* --- Concierge Services Grid Section --- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 md:mb-14 text-center">
            How We Can Assist You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conciergeServicesData.map((service, index) => (
              <motion.div
                key={service.title}
                className="group rounded-lg bg-white shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden" // Changed border slightly
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                 {/* Image container - NOW SQUARE */}
                 {/* Using aspect-square makes the height equal to the width determined by the grid column */}
                <div className="w-full aspect-square overflow-hidden bg-gray-100">
                   <img
                     src={service.image}
                     alt={service.title}
                     // Using object-cover ensures the square image fills the square container
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

        {/* --- Benefit/Assurance Section --- */}
         <motion.section
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 md:p-16 rounded-xl text-center shadow-inner"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Experience the Jetstream Difference</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
               Our concierge team is available 24/7 to attend to your needs with discretion, efficiency, and a proactive approach. We anticipate challenges and provide elegant solutions, ensuring a smooth and enjoyable experience from arrival to departure.
            </p>
        </motion.section>


        
        <motion.section
          className="text-center py-16 md:py-20 bg-gradient-to-br from-[#0a0f24] to-[#1c2a5e] rounded-xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
           <div className="container mx-auto px-4">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                 Ready for Exceptional Concierge Service?
             </h2>
             <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                 Let us take care of the details. Contact us today to discuss your specific requirements and how we can enhance your aviation experience.
             </p>
             <Link
                to="/contact-us" 
                className="inline-block bg-white hover:bg-gray-100 text-blue-700 font-bold py-3 px-10 rounded-full text-lg transform transition duration-300 hover:scale-105 shadow-md hover:shadow-lg"
             >
               Get In Touch
             </Link>
           </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Concierge;