import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Career from "./pages/Career";
import Charters from "./pages/Charters";
import Concierge from "./pages/Concierge";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import GroundHandling from "./services/GroundHandling";
import FuelArrangement from "./services/FuelArrangement";
import FlightsPlanning from "./services/FlightsPlanning";
import Caterings from "./services/Caterings";
import PermitsNavigation from "./services/PermitsNavigation";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Suggestions from "./pages/Suggestions";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserList from "./pages/UserList";
import Messages from "./pages/Messages";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <ScrollToTop />

      <Routes>

        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/charters" element={<Charters />} />
        <Route path="/concierge" element={<Concierge />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/ground-handling" element={<GroundHandling />} />
        <Route path="/fuel-arrangement" element={<FuelArrangement />} />
        <Route path="/flights-planning" element={<FlightsPlanning />} />
        <Route path="/caterings" element={<Caterings />} />
        <Route path="/permits-navigation" element={<PermitsNavigation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  );
}

export default App;
