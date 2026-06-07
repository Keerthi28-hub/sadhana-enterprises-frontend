import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import ContactPage from "./pages/ContactPage";
import ProductsSection from "./components/ProductsSection";
import ProfilePage from "./pages/ProfilePage";
import WelcomeSection from "./components/WelcomeSection";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RequirementBox from "./components/RequirementBox";
import ShowcaseCarousel from "./components/ShowcaseCarousel";

import ReviewsSection from "./components/ReviewsSection";
import ReviewsPage from "./pages/ReviewsPage";

import EmailModal from "./components/EmailModal";   // ✅ ADD
import CallModal from "./components/CallModal"; 
import Footer from "./components/Footer";    // ✅ ADD

function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <WelcomeSection />
      <RequirementBox />
      <ShowcaseCarousel />
      <ReviewsSection />
    </>
  );
}

function App() {

  // ✅ GLOBAL MODAL STATE
  const [showEmail, setShowEmail] = useState(false);
  const [showCall, setShowCall] = useState(false);

  return (
    <Router>

      {/* ✅ NAVBAR */}
      <Navbar />

      {/* ✅ ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<ProfilePage />} />
        <Route path="/products" element={<ProductsSection />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>

      {/* ✅ FOOTER WITH ACTIONS */}
      <Footer
        openEmailModal={() => setShowEmail(true)}
        openCallModal={() => setShowCall(true)}
      />

      {/* ✅ MODALS */}
      <EmailModal
        isOpen={showEmail}
        onClose={() => setShowEmail(false)}
      />

      <CallModal
        isOpen={showCall}
        onClose={() => setShowCall(false)}
      />

    </Router>
  );
}

export default App;