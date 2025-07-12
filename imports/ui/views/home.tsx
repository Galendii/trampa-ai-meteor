import React from "react";
import Navigation from "../../components/landing/Navigation";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Testimonials from "../../components/landing/Testimonials";
import Pricing from "../../components/landing/Pricing";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";
import PWAInstallBanner from "../../components/ui/PWAInstallBanner";
// import PWAInstallBanner from "../../components/PWAInstallBanner";

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
      <PWAInstallBanner />
    </React.Fragment>
  );
};
export default Home;
