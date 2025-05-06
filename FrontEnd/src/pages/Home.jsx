import Hero from "../components/Hero";
import ServiceBar from "../components/ServiceBar";
import Benefits from "../components/Benefits";
import Contact from "../components/Contact";
import Highlights from "../components/Highlights";
import HeroImg from "../components/HeroImg";
import Footer from "../components/Footer";
import AboutHome from "../components/AboutHome";
import SuggestionBox from "../components/SuggestionBox";

const Home = () => {
  return (
    <div>
      <Hero />
      <ServiceBar />
      <AboutHome />
      <Benefits />
      <Highlights />
      {/* <MeetExperts /> */}
      <HeroImg />
      <SuggestionBox />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
