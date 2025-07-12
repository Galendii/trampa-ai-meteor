import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/landing/Footer";
import Navigation from "../components/landing/Navigation";
import { ToastProvider } from "../contexts/ToastContext";

// import { Container } from './styles';

const MainLayout: React.FC = () => {
  return (
    <main>
      <ToastProvider>
        <Navigation />
        <div className="min-h-screen  pt-16">
          <Outlet />
        </div>
        <Footer />
      </ToastProvider>
    </main>
  );
};

export default MainLayout;
