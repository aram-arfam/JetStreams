import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaBroadcastTower } from 'react-icons/fa'; // Added FaBroadcastTower for SITA/AFTN
import {assets} from '../assets/assets';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null, 'success', 'error'

  // Reusable animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Stagger children variant for contact details list
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Delay between each item appearing
      }
    }
  };

  // Individual item variant
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };
 

  // ADD THIS BACK: Simple fade-in for image/form columns
  const itemFadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2, ease: "easeOut" } } // Added slight delay
  };



  // Form input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setSubmissionStatus(null); // Clear status on new input
  };

  // Form submission handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/messages",
        formData
      );

      if (response.data.success) {
        setSubmissionStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      } else {
        throw new Error(response.data.message || 'Submission failed.');
      }

    } catch (error) {
      console.error('Submission failed:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    } 
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
            Contact Us
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto"
             initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Get in touch with us and let us know what you need. We’re here 24/7 and ready to serve.
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 md:py-24 space-y-16 md:space-y-24">

        {/* --- Contact Details & Form Section --- */}
               {/* --- Contact Details & Form Section --- Enhanced UI v2 --- */}
               <motion.section
          // Flex layout for columns, gradient background, padding, rounded corners, shadow
          className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch bg-gradient-to-tr from-blue-100 via-white to-indigo-100 p-8 md:p-12 rounded-xl shadow-lg border border-gray-200"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left Column: Contact Details - Enhanced Styling */}
          <motion.div
            className="lg:w-2/5 flex-shrink-0 space-y-8" // Define width, prevent shrinking
            variants={listVariants} // Stagger container
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Intro Text */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Get In Touch
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Reach out directly via phone, email, or visit our offices. We look forward to hearing from you.
              </p>
            </motion.div>

            {/* Dubai Details Card */}
            <motion.div variants={itemVariants} className="p-5 bg-white rounded-lg shadow border border-gray-100 space-y-4">
              <h3 className="text-xl font-semibold text-blue-800 border-b border-gray-200 pb-2 mb-3">Dubai Contact Details</h3>
              {/* Phone */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                  <FaPhoneAlt className="w-3 h-3" />
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700 block mb-0.5">Call Us:</span>
                  <a href="tel:+97144397266" className="block text-gray-600 hover:text-blue-700 hover:underline">T: +971 4439 7266</a>
                  <a href="tel:+971556177253" className="block text-gray-600 hover:text-blue-700 hover:underline">M: +971 556177253</a>
                  <a href="tel:+971585956984" className="block text-gray-600 hover:text-blue-700 hover:underline">M: +971 585956984</a>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start space-x-3">
                 <div className="flex-shrink-0 mt-1 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                  <FaEnvelope className="w-3 h-3" />
                </div>
                <div className="text-sm">
                   <span className="font-medium text-gray-700 block mb-0.5">Email Us:</span>
                  <a href="mailto:ops@jsid.aero" className="block text-gray-600 hover:text-blue-700 hover:underline">ops@jsid.aero</a>
                  <a href="mailto:sales@jsid.aero" className="block text-gray-600 hover:text-blue-700 hover:underline">sales@jsid.aero</a>
                </div>
              </div>
            </motion.div>

            {/* India Details Card */}
            <motion.div variants={itemVariants} className="p-5 bg-white rounded-lg shadow border border-gray-100 space-y-4">
              <h3 className="text-xl font-semibold text-blue-800 border-b border-gray-200 pb-2 mb-3">India Contact Details</h3>
               {/* Phone */}
              <div className="flex items-start space-x-3">
                 <div className="flex-shrink-0 mt-1 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                  <FaPhoneAlt className="w-3 h-3" />
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700 block mb-0.5">Call Us:</span>
                  <a href="tel:01722911686" className="block text-gray-600 hover:text-blue-700 hover:underline">T: 0172-2911686</a>
                  <a href="tel:+916283454898" className="block text-gray-600 hover:text-blue-700 hover:underline">M: +91 6283454898</a>
                </div>
              </div>
               {/* Email */}
              <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                  <FaEnvelope className="w-3 h-3" />
                </div>
                 <div className="text-sm">
                   <span className="font-medium text-gray-700 block mb-0.5">Email Us:</span>
                  <a href="mailto:ops.india@jsid.aero" className="block text-gray-600 hover:text-blue-700 hover:underline">ops.india@jsid.aero</a>
                  <a href="mailto:sales.india@jsid.aero" className="block text-gray-600 hover:text-blue-700 hover:underline">sales.india@jsid.aero</a>
                </div>
              </div>
            </motion.div>

            {/* Addresses Card */}
             <motion.div variants={itemVariants} className="p-5 bg-white rounded-lg shadow border border-gray-100 space-y-4">
               <h3 className="text-xl font-semibold text-blue-800 border-b border-gray-200 pb-2 mb-3">Addresses</h3>
                <div className="flex items-start space-x-3">
                   <div className="flex-shrink-0 mt-1 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="w-3 h-3" />
                  </div>
                   <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                       <p>
                           Premises # 22912, DDP Building A2,<br /> Dubai Silicon Oasis, Dubai, United Arab Emirates
                       </p>
                       <p>
                           Plot No 29, Sector 82 JLPL,<br /> SAS Nagar Mohali Punjab, India – 140308
                       </p>
                       <p>
                           WZ41-C, Street No -10,<br/> Krishna Park Extn, New Delhi, India -110018
                       </p>
                   </div>
                </div>
             </motion.div>

             {/* SITA / AFTN Card */}
             <motion.div variants={itemVariants} className="p-5 bg-white rounded-lg shadow border border-gray-100 space-y-3">
                <h3 className="text-xl font-semibold text-blue-800 border-b border-gray-200 pb-2 mb-3">SITA / AFTN</h3>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                    <FaBroadcastTower className="w-3 h-3" />
                  </div>
                   <div className="text-sm">
                        <p className="text-gray-600 leading-relaxed font-medium">SITA: <span className="font-normal text-gray-700">DXBJS7X</span></p>
                        <p className="text-gray-600 leading-relaxed font-medium">AFTN: <span className="font-normal text-gray-700">KGJTXAAJ</span></p>
                   </div>
                </div>
             </motion.div>

          </motion.div>

          {/* Right Column: Contact Form - Enhanced Styling */}
                    {/* Right Column: Contact Form + Image Below */}
                    <motion.div // Added motion here for potential variant application
            className="lg:w-3/5 flex flex-col" // Use flex-col to stack form and image
            variants={itemFadeInVariants} // Apply variant to the whole column
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Form Container */}
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-xl border border-gray-100 flex-grow mb-8"> {/* Added mb-8 and removed flex-grow */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Send Us a Message
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Input Fields */}
                {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@example.com' },
                    { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Reason for contacting us' },
                ].map(field => (
                    <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-600 mb-1.5">{field.label}</label>
                    <input
                        type={field.type} id={field.id} name={field.id} value={formData[field.id]} onChange={handleInputChange} required
                        // Enhanced Input Styling
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400"
                        placeholder={field.placeholder}
                    />
                    </div>
                ))}

                {/* Message Textarea */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-1.5">Message</label>
                    <textarea
                    id="message" name="message" rows="6" value={formData.message} onChange={handleInputChange} required
                    // Enhanced Textarea Styling
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400"
                    placeholder="Enter your message here..."
                    ></textarea>
                </div>

                {/* Submit Button & Status Message */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="h-6"> {/* Placeholder for status message alignment */}
                    {submissionStatus === 'success' && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-green-600">Message sent successfully!</motion.p>
                    )}
                    {submissionStatus === 'error' && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600">Failed to send message. Please try again.</motion.p>
                    )}
                    </div>

                    <motion.button
                    type="submit" disabled={isSubmitting}
                    // Enhanced Button Styling
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'} text-white font-bold py-3 px-8 rounded-lg text-base transition duration-300 shadow-lg hover:shadow-blue-300/50`}
                    whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}} // Subtle lift on hover
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                    {isSubmitting ? 'Sending...' : <>Send Message <FaPaperPlane className="ml-1 h-4 w-4" /></>}
                    </motion.button>
                </div>
                </form>
            </div>

            {/* Added Image Section Below Form */}
            <div className="mt-auto"> {/* Use mt-auto if needed, or rely on mb on form container */}
               <img
                  // IMPORTANT: Replace with your actual image asset key
                  src={ assets.contact_image || 'https://via.placeholder.com/500x300/E0F2FE/0C4A6E?text=Contact+Illustration'} // Add relevant fallback
                  alt="Illustration related to contacting support or communication"
                  className="w-full h-auto object-contain rounded-lg shadow-md max-w-md mx-auto" // Contained image, max width, centered
               />
            </div>
          </motion.div>
        </motion.section>

        {/* --- Map Section --- */}
        <motion.section
           variants={sectionVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.2 }}
        >
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Location (IFZA Business Park)
           </h2>
           <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
              {/* Map Embed URL for IFZA Business Park, Dubai */}
              <iframe
                 src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3612.5064675313774!2d55.37495332537922!3d25.118562627761644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sifza%20business%20park!5e0!3m2!1sen!2sin!4v1745607733460!5m2!1sen!2sin"
                 width="100%"
                 height="450" // Adjust height as needed
                 style={{ border:0 }}
                 allowFullScreen=""
                 loading="lazy"
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Jetstream International Location Map - IFZA Business Park"
              ></iframe>
           </div>
        </motion.section>

      </div>
    </div>
  );
}

export default ContactUs;