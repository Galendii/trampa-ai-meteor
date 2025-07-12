import React, { useCallback, useState } from "react";
import { Menu, X } from "lucide-react";
// import PWAInstallBanner from "../PWAInstallBanner";
import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = useCallback((section: string) => {
    document.getElementById(section)?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-200/60 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-slate-800">Trampa AI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              Recursos
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              Preços
            </button>
            {/* <PWAInstallBanner variant="button" /> */}
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="btn-primary"
            >
              Acessar Grátis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Recursos
              </a>
              <a
                href="#testimonials"
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Depoimentos
              </a>
              <a
                href="#pricing"
                className="text-slate-600 hover:text-slate-800 font-medium"
              >
                Preços
              </a>
              {/* <PWAInstallBanner variant="button" /> */}
              <Link to="/login" className="btn-primary text-center">
                Acessar Grátis
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
