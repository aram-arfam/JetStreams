import React, { useState } from 'react'; // Import useState
// Removed Link import as we're handling the form internally now
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { FaUsers, FaLightbulb, FaChartLine, FaHandsHelping, FaPaperPlane } from 'react-icons/fa'; // Added FaPaperPlane for submit
import { IoBriefcaseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

// No specific assets needed unless you add images later

function Career() { // Renamed component to PascalCase standard
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Optional: for submit button state

  // Data for the "Why Join Us" section (based on common career page themes)
  const whyJoinUsData = [
     {
      icon: FaChartLine,
      title: 'Growth Opportunities',
      description: 'We invest in our employees\' development with continuous learning, training programs, and clear career progression paths.',
    },
    {
      icon: FaLightbulb,
      title: 'Innovative Culture',
      description: 'Be part of a forward-thinking team that embraces new ideas, challenges the status quo, and drives innovation in aviation.',
    },
    {
      icon: FaUsers,
      title: 'Collaborative Team Spirit',
      description: 'Work alongside passionate and dedicated professionals in a supportive environment that values teamwork and mutual respect.',
    },
    {
      icon: FaHandsHelping,
      title: 'Impactful Work',
      description: 'Contribute to meaningful projects that shape the future of aviation services and make a tangible difference.',
    },
  ];

  // --- Animation Variants ---
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const iconCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i) => ({
      opacity: 1, scale: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "backOut" }
    })
  };

  // Variants for the flip/tilt effect
  const flipVariants = {
    initial: { opacity: 0, rotateY: -90 }, // Start tilted back
    animate: { opacity: 1, rotateY: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, rotateY: 90, transition: { duration: 0.4, ease: "easeIn" } } // Tilt forward on exit
  };


  // --- Event Handlers ---
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setResumeFile(event.target.files[0]);
    } else {
      setResumeFile(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent default browser submission
    setIsSubmitting(true);

    const submissionData = new FormData(); // Use FormData for file uploads
    submissionData.append('name', formData.name);
    submissionData.append('email', formData.email);
    if (resumeFile) {
       submissionData.append('resume', resumeFile, resumeFile.name);
    }

    console.log('Form Submitted!');
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Resume File:', resumeFile ? resumeFile.name : 'No file selected');
   

    // Simulate API call delay
    setTimeout(() => {
      
      setFormData({ name: '', email: '' });
      setResumeFile(null);
      document.getElementById('resume-upload').value = ''; // Clear file input visually
      setIsFormVisible(false); // Hide form again after submission
      setIsSubmitting(false);
      toast.success('Form submitted successfully!');
      
    }, 1500);
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
            Careers
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto"
             initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Join our dynamic team and help shape the future of aviation services.
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
            Build Your Career with Jetstream International
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Jetstream International, we believe our people are our greatest asset. We foster a culture of excellence, innovation, and collaboration where talented individuals can thrive. Explore opportunities to grow, contribute, and make an impact in the exciting world of aviation.
          </p>
        </motion.section>


        {/* --- Why Join Us Grid Section --- */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 md:mb-14 text-center">
            Why Join Our Team?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyJoinUsData.map((item, index) => (
              <motion.div
                key={item.title}
                className="group flex flex-col items-center text-center p-6 rounded-lg bg-white shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 ease-in-out"
                custom={index}
                variants={iconCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                 <div className="w-16 h-16 mb-5 rounded-full bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                   <item.icon
                     className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300"
                     aria-hidden="true"
                   />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>


        {/* --- Current Openings / Application Section --- */}
        <motion.section
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-10 md:p-16 rounded-xl text-center shadow-inner overflow-hidden" // Added overflow-hidden
          // Setting perspective for 3D rotation effect (optional, adjust value)
          style={{ perspective: '1000px' }}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <IoBriefcaseOutline className="text-4xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Apply Now</h2>

          {/* AnimatePresence handles the enter/exit animations */}
          {/* mode="wait" ensures one component animates out before the next animates in */}
          <AnimatePresence mode="wait">
            {!isFormVisible ? (
              // --- Initial View (Text + Button) ---
              <motion.div
                key="button-view" // Unique key is required for AnimatePresence children
                className="max-w-3xl mx-auto"
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  We are always looking for passionate and talented individuals. Submit your details and resume below, and we'll be in touch if a suitable opportunity arises.
                </p>
                <motion.button
                  onClick={() => setIsFormVisible(true)} // Show form on click
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-md hover:shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit Your Resume <FaPaperPlane />
                </motion.button>
              </motion.div>
            ) : (
              // --- Form View ---
              <motion.div
                key="form-view" // Unique key
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-lg mx-auto text-left" // Limit form width and align text left
              >
                <form onSubmit={handleFormSubmit}>
                  {/* Name Input */}
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {/* Phone Number Input */}
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Resume File Input */}
                  <div className="mb-6">
                    <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700 mb-1">Attach Resume (PDF, DOCX)</label>
                    <input
                      type="file"
                      id="resume-upload"
                      name="resume"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" // Specify accepted formats
                      className="w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-md file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-blue-50 file:text-blue-700
                                 hover:file:bg-blue-100"
                    />
                    {resumeFile && <p className="text-xs text-gray-600 mt-1">Selected: {resumeFile.name}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting} // Disable button while submitting
                      className={`inline-flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 shadow-md hover:shadow-lg`}
                      whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    >
                      {isSubmitting ? 'Submitting...' : <>Send Application <FaPaperPlane /></> }
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* --- Old CTA Section Removed (Functionality moved above) --- */}

      </div>
    </div>
  );
}

export default Career; // Use PascalCase for export