import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Faqs from "./components/Faqs";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/Form";

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="max-w-7xl mx-auto pt-20 px-6">
                <HeroSection />
                <FeatureSection />
                <Workflow />
                <Faqs />
                <Testimonials />
                {/* <ContactUs /> */}
                </div>
            }
          />
          <Route path="/register" element={<Form />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
