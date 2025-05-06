import axios from "axios";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { JetContext } from "../context/AppContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(JetContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        backendUrl + "/api/login",

        formData,
        { withCredentials: true }
      );

      if (data.success) {
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f24] flex items-center justify-center">
      <div className="bg-[#1f2a46] p-10 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-4xl text-center font-extrabold text-white mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 text-lg text-white bg-[#2e3b57] rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-4 text-lg text-white bg-[#2e3b57] rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-300"
            />
          </div>

          {/* Reset Password & Register Links */}
          <div className="flex justify-between items-center mb-6">
            <Link
              to="/reset-password"
              className="text-sm text-yellow-400 hover:underline"
            >
              Forgot Password?
            </Link>
            <Link
              to="/register"
              className="text-sm text-yellow-400 hover:underline"
            >
              Register for a new account
            </Link>
          </div>

          {/* Login Button */}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="w-full p-4 text-lg font-bold text-blue-900 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
