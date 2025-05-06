import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets'; 

function Services() {

  
  const servicesData = [
    {
      image: assets.ground_handling_services,
      title: 'Ground Handling Services',
      description: 'Comprehensive support including parking, marshalling, baggage handling, and ground power units to ensure smooth turnarounds.',
    },
    {
      image: assets.permits_and_navigation_services,
      title: 'Landing & Overflight Permits',
      description: 'Efficiently securing necessary permits for your flights across various regions, navigating complex regulations on your behalf.',
    },
    {
      image: assets.fuel_arrangement_services,
      title: 'Fueling Services',
      description: 'Reliable and competitively priced aviation fuel supply (Jet A-1, Avgas) coordinated at airports worldwide.',
    },
    {
      image: assets.flight_planning_services,
      title: 'Flight Planning & Dispatch',
      description: 'Expert flight planning, weather briefing, NOTAM checks, and ATC flight plan filing for optimal and compliant routes.',
    },
    {
      image: assets.concierge_services,
      title: 'Crew & Passenger Assistance',
      description: 'Dedicated support for crew and passengers, including hotel arrangements, transportation, visa assistance, and VIP handling.',
    },
    {
      image: assets.catering_services,
      title: 'Catering Arrangements',
      description: 'Coordinating high-quality in-flight catering services tailored to meet specific dietary requirements and preferences.',
    },

  ];

  // Reusable animation variants (no changes needed here)
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
      {/* --- Hero Section  --- */}
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
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto"
             initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Delivering comprehensive, reliable, and tailored aviation solutions to meet your global operational needs 24/7.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16 md:space-y-24">

        {/* --- Introduction Section*/}
        <motion.section
          className="text-center max-w-3xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            End-to-End Aviation Support
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Jetstream International, we offer a full spectrum of flight support services designed for efficiency, safety, and convenience. From meticulous ground handling to seamless permit acquisition and beyond, our expert team ensures every aspect of your operation runs flawlessly.
          </p>
        </motion.section>


        {/* --- Services Grid Section --- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 md:mb-14 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.title}
                className="group rounded-lg bg-white shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden" // Consistent border
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                 {/* Image container*/}
                <div className="w-full aspect-square overflow-hidden bg-gray-100">
                   <img
                     src={service.image}
                     alt={service.title}
                     // Using object-cover for square image in square container
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


         <motion.section
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 md:p-16 rounded-xl text-center shadow-inner"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Partner With Us?</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
               Our commitment goes beyond standard services. We offer unparalleled 24/7 support, deep industry expertise gained over decades, transparent pricing, and truly customized solutions designed around your specific requirements. Experience the difference of a dedicated aviation partner.
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
                 Ready for Seamless Flight Operations?
             </h2>
             <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                 Let us handle the complexities while you focus on flying. Contact our team today to discuss your needs and get a personalized quote.
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

export default Services;