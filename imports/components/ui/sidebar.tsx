import {
  LayoutDashboard,
  Calendar,
  Users,
  UserCheck,
  DollarSign,
  Menu,
  X,
  ArchiveIcon,
  HandshakeIcon,
} from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Button from "./Button";
import { Meteor } from "meteor/meteor";
import { useToast } from "/imports/contexts/ToastContext";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Clientes", href: "/clientes", icon: Users },
  { name: "Agenda", href: "/agenda", icon: Calendar },
  { name: "Contratos", href: "/contratos", icon: ArchiveIcon },
  { name: "Serviços", href: "/servicos", icon: HandshakeIcon },
  // { name: "Profissionais", href: "/profissionais", icon: UserCheck },
  // { name: "Financeiro", href: "/financeiro", icon: DollarSign },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const pathname = useMemo(() => window.location.pathname, [window.location]);

  const { addToast } = useToast();
  const navigate = useNavigate();
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const menuButton = document.getElementById("menu-button");

      if (
        isMobileMenuOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && windowWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen, windowWidth]);

  const handleLogout = () => {
    Meteor.logout((err) => {
      if (err) {
        addToast("Erro ao sair: " + err.message, "danger");
      } else {
        addToast("Logout realizado com sucesso", "success");
        navigate("/login"); // or any route you want
      }
    });
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed right-6 bottom-6 z-50">
        <button
          id="menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 rounded-xl bg-white shadow-soft border border-slate-200/60 text-slate-600 hover:text-slate-800 transition-colors"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white/95 backdrop-blur-xl shadow-soft-lg border-r border-slate-200/60 transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-slate-200/60">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <span className="text-xl font-bold text-slate-800">
                  Trampa AI
                </span>
                <p className="text-xs text-slate-500 -mt-0.5">
                  Gestão Inteligente
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-primary-600 text-white shadow-md hover:bg-primary-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
            <Button onClick={handleLogout} variant="ghost">
              Logout
            </Button>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200/60">
            <div className="text-center">
              <p className="text-xs text-slate-500 font-medium">
                Sua gestão, clara como o dia.
              </p>
              <div className="mt-2 flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span className="text-xs text-slate-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
