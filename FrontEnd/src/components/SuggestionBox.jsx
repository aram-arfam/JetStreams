import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegUser,
  FaRegEnvelope,
  FaRegCommentDots, // Keep this for the icon
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaPencilAlt, // New icon for the initial button
} from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

const SuggestionBox = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: null, message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

  // --- Animation Variants ---

  // Variant for the main container switch (Initial View <-> Form/Success View)
  // Using a fade/scale effect similar to your original formVariants for simplicity,
  // but you could replace this with the 'flipVariants' from your example if preferred.
  const viewSwitchVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3, ease: "easeIn" },
    },
    // --- OR if you want the flip effect ---
    // initial: { rotateY: 90, opacity: 0 },
    // animate: { rotateY: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    // exit: { rotateY: -90, opacity: 0, transition: { duration: 0.4, ease: 'easeIn' } },
  };

  // Simpler variant for success message appearance
  const successMessageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
    },
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear only error status on input change
    if (status.type === "error") {
      setStatus({ type: null, message: "" });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      // --- Replace with your actual API endpoint ---
      const response = await axios.post(
        "http://localhost:4000/api/suggestions", // Make sure this is correct
        formData
      );
      // --- OR Mock Success ---
      // console.log("Submitting:", formData);
      // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      // const response = { data: { success: true } }; // Mock success
      // --- End Mock ---

      if (response.data.success) {
        setStatus({ type: "success", message: "Thank you for the feedback!" });
        setIsSubmitted(true); // Show success message
        // Keep showForm true, just switch internal content
        setFormData({ name: "", email: "", message: "" }); // Clear form fields
      } else {
        throw new Error(response.data.message || "Submission failed.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";
      setStatus({ type: "error", message: errorMessage });
      console.error("Error submitting form:", error);
      setIsSubmitted(false); // Ensure form stays visible on error
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to reset and show the form again (e.g., from success screen)
  const handleShowFormAgain = () => {
    setIsSubmitted(false);
    setStatus({ type: null, message: "" });
    // setShowForm(true); // Already true, just resetting submission state
  };
  // Function to go back from form to intro
  const handleBackToIntro = () => {
    setShowForm(false);
    setIsSubmitted(false); // Reset submission status if going back
    setStatus({ type: null, message: "" }); // Clear status
    setFormData({ name: "", email: "", message: "" }); // Optional: Clear form data when going back
  };

  return (
    <div
      className="max-w-3xl mx-auto bg-gradient-to-br from-[#1b1e28] to-[#2c3140] p-8 md:p-12 rounded-xl shadow-2xl text-white overflow-hidden"
      // Add perspective if using rotateY animation
      // style={{ perspective: '1000px' }}
    >
      {/* Use AnimatePresence to manage transitions between Initial View and Form/Success View */}
      <AnimatePresence mode="wait">
        {!showForm ? (
          // --- Initial View (Text + Button) ---
          <motion.div
            key="suggestion-intro" // Unique key for AnimatePresence
            className="text-center"
            variants={viewSwitchVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FaRegCommentDots className="text-4xl text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Suggestion Box
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto">
              Have an idea or feedback to share? We would love to hear from you.
              Click below to leave your suggestion.
            </p>
            <motion.button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-yellow-500 text-[#1b1e28] font-bold py-3 px-8 rounded-lg text-lg transition duration-300 shadow-md hover:shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1b1e28] focus:ring-yellow-500"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Leave a Suggestion <FaPencilAlt />
            </motion.button>
          </motion.div>
        ) : (
          // --- Form / Success View Container ---
          <motion.div
            key="suggestion-form-area" // Unique key
            variants={viewSwitchVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Conditionally render Form or Success Message *within* this animated container */}
            {!isSubmitted ? (
              // --- Main Form ---
              // We don't need motion.form here if the parent motion.div handles the main transition
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Optional: Add a back button */}
                {/* <button type="button" onClick={handleBackToIntro} className="text-sm text-yellow-400 hover:underline mb-4">← Back</button> */}

                <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 tracking-tight">
                  Your Suggestion
                </h2>
                {/* Inputs - Using a simpler structure for clarity */}
                {/* Name Input */}
                <div className="relative">
                  <label htmlFor="name" className="sr-only">
                    Your Name
                  </label>
                  <FaRegUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    // Removed required if optional
                    className="p-3 pl-10 w-full border border-gray-600 rounded-md bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200"
                  />
                </div>
                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="email" className="sr-only">
                    Your Email
                  </label>
                  <FaRegEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 pl-10 w-full border border-gray-600 rounded-md bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200"
                  />
                </div>
                {/* Message Textarea */}
                <div className="relative">
                  <label htmlFor="message" className="sr-only">
                    Your Suggestion
                  </label>
                  <FaRegCommentDots className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" />
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Suggestion*"
                    value={formData.message}
                    onChange={handleChange}
                    required // Suggestion itself should likely be required
                    className="w-full p-3 pl-10 border border-gray-600 rounded-md bg-gray-700/50 text-white placeholder-gray-400 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-200"
                  ></textarea>
                </div>

                {/* Error Message Display */}
                {status.type === "error" && (
                  <motion.p // Add motion for subtle appearance
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-sm text-center flex items-center justify-center gap-2"
                  >
                    <FaExclamationCircle /> {status.message}
                  </motion.p>
                )}

                {/* Submit Button */}
                <div className="text-center pt-2">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative inline-flex items-center justify-center gap-2 bg-yellow-500 text-[#1b1e28] font-bold py-3 px-8 rounded-lg w-full sm:w-auto hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1b1e28] focus:ring-yellow-500 transition duration-200 shadow-lg hover:shadow-yellow-400/30 disabled:opacity-60 disabled:cursor-not-allowed`}
                    whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        {" "}
                        <CgSpinner className="animate-spin h-5 w-5" />{" "}
                        Submitting...{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        Submit Suggestion{" "}
                        <FaPaperPlane className="ml-1 w-4 h-4" />{" "}
                      </>
                    )}
                  </motion.button>
                </div>
                {/* Optional Back Button */}
                <div className="text-center mt-4">
                  <button
                    type="button"
                    onClick={handleBackToIntro}
                    className="text-sm text-gray-400 hover:text-yellow-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // --- Success Message ---
              <motion.div
                // key is implicitly handled by the parent AnimatePresence logic here
                className="flex flex-col justify-center items-center text-center min-h-[300px]" // Adjust min-height as needed
                variants={successMessageVariants} // Use a simpler variant for content inside
                initial="hidden"
                animate="visible"
                // No exit needed if it stays within the 'showForm' container
              >
                <FaCheckCircle className="text-green-400 text-6xl mb-5" />
                <h3 className="text-2xl font-semibold mb-3">Success!</h3>
                <p className="text-lg text-gray-200 mb-6">{status.message}</p>
                <motion.button
                  onClick={handleShowFormAgain} // Use the reset function
                  className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg text-base transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1b1e28] focus:ring-gray-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Leave Another Suggestion <FaPencilAlt />
                </motion.button>
                <button
                  type="button"
                  onClick={handleBackToIntro}
                  className="mt-4 text-sm text-gray-400 hover:text-yellow-400 transition duration-200"
                >
                  Go Back
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuggestionBox;
