import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { JetContext } from "../context/AppContext";

const Register = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(JetContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents refresh

    try {
      const { data } = await axios.post(backendUrl + "/api/register", formData);

      if (data.success) {
        toast.success(
          <div className="text-lg font-bold text-gray-900 text-center">
            🎉 Thanks for being a part of Jetstream! <br /> Please Login Now
          </div>,
          {
            position: "top-center",
            autoClose: 2000,
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 3500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:border-yellow-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:border-yellow-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:border-yellow-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:border-yellow-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Bio (Optional)
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={(e) => {
                handleChange(e);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:border-yellow-400 focus:outline-none resize-none overflow-hidden"
              rows="2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-400 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
