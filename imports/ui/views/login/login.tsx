import React, { useState, useEffect, useMemo } from "react";
import { Building2, User, UserCheck, ArrowRight } from "lucide-react";
import { WizardProvider } from "/imports/contexts/WizardContext";
import SignupWizard, {
  CLIENT_STEPS,
  ORGANIZATION_STEPS,
  PROFESSIONAL_STEPS,
} from "/imports/components/ui/SignupWizard";
import LoginModal from "/imports/components/ui/LoginModal";
import Card from "/imports/components/ui/Card";
import LoginHeader from "./components/login-header";
import Features from "./components/features";
import Button from "/imports/components/ui/Button";

type UserType = "client" | "professional" | "organization" | null;

const LoginPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupWizard, setShowSignupWizard] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const initialFormData = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      cpf: "",
      cnpj: "",
      companyName: "",
      productId: null,
      role: selectedUserType ?? "client",
    }),
    [selectedUserType]
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const userTypes = [
    {
      id: "client" as const,
      title: "Cliente",
      description: "Acesse sua agenda, planos e acompanhe seu progresso",
      icon: User,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-50",
      borderColor: "border-primary-200",
      hoverColor: "border-primary-300",
      iconColor: "text-primary",
    },
    {
      id: "professional" as const,
      title: "Profissional",
      description: "Gerencie seus clientes, agenda e crescimento professional",
      icon: UserCheck,
      color: "from-secondary-500 to-secondary-600",
      bgColor: "bg-secondary-50",
      borderColor: "border-secondary-200",
      hoverColor: "border-secondary-300",
      iconColor: "text-secondary",
    },
    {
      id: "organization" as const,
      title: "Organização",
      description: "Administre sua equipe, profissionais e operação completa",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "border-purple-300",
      iconColor: "text-purple",
    },
  ];

  const handleUserTypeSelect = (
    userType: UserType,
    action: "login" | "signup"
  ) => {
    setSelectedUserType(userType);
    if (action === "login") {
      setShowLoginModal(true);
    } else {
      setShowSignupWizard(true);
    }
  };

  const SIGNUP_STEPS = useMemo(() => {
    if (selectedUserType === "client") {
      return CLIENT_STEPS;
    }
    if (selectedUserType === "professional") {
      return PROFESSIONAL_STEPS;
    }
    if (selectedUserType === "organization") {
      return ORGANIZATION_STEPS;
    }
    return CLIENT_STEPS;
  }, [selectedUserType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <LoginHeader />

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card.Root
                key={type.id}
                borderColor={type.borderColor}
                hoverColor={type.hoverColor}
              >
                <Card.Icon
                  bgColor={type.bgColor}
                  Icon={Icon}
                  iconClassName={type.iconColor}
                />

                <Card.Header
                  title={type.title}
                  description={type.description}
                />

                <Card.Footer>
                  <Button
                    onClick={() => handleUserTypeSelect(type.id, "login")}
                    className={`
                        w-full bg-gradient-to-r ${type.color} text-white 
                      `}
                  >
                    <span>Fazer Login</span>
                    <ArrowRight size={14} />
                  </Button>

                  <Button
                    onClick={() => handleUserTypeSelect(type.id, "signup")}
                    variant="outline"
                    className="w-full"
                  >
                    Criar Conta
                  </Button>
                </Card.Footer>
              </Card.Root>
            );
          })}
        </div>
        <Features />
      </div>

      {/* Modals */}
      {showLoginModal && selectedUserType && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => {
            setShowLoginModal(false);
            setSelectedUserType(null);
          }}
        />
      )}

      {showSignupWizard && selectedUserType && (
        <WizardProvider initialFormData={initialFormData} steps={SIGNUP_STEPS}>
          <SignupWizard
            userType={selectedUserType}
            onClose={() => {
              setShowSignupWizard(false);
              setSelectedUserType(null);
            }}
          />
        </WizardProvider>
      )}
    </div>
  );
};
export default LoginPage;
