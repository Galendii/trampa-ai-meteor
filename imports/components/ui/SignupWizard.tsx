import React, { useState } from "react";
import { X, User, Lock, FileText, Check } from "lucide-react";
import {
  Wizard,
  WizardHeader,
  WizardContent,
  WizardStep,
  WizardFooter,
} from "./Wizard";
import PersonalInfoStep from "../signup/PersonalInfoStep";
import SecurityStep from "../signup/SecurityStep";
import DocumentationStep from "../signup/DocumentationStep";
import SuccessStep from "../signup/SuccessStep";
import { useToast } from "/imports/contexts/ToastContext";
import { useWizard } from "/imports/contexts/WizardContext";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { generateAlphanumericCode } from "/imports/utils";

interface SignupWizardProps {
  userType: "client" | "professional" | "organization";
  onClose: () => void;
}

interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Step 2
  password: string;
  passwordConfirmation: string;
  // Step 3
  cpf: string;
  cnpj?: string;
  companyName?: string;
}

export const SIGNUP_STEPS = [
  { id: "personal", title: "Dados Pessoais", icon: User },
  { id: "security", title: "Segurança", icon: Lock },
  { id: "documentation", title: "Documentação", icon: FileText },
  { id: "success", title: "Sucesso", icon: Check },
];

export default function SignupWizard({ userType, onClose }: SignupWizardProps) {
  const { currentStepId, nextStep, prevStep } = useWizard();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    cpf: "",
    cnpj: "",
    companyName: "",
  });
  const navigate = useNavigate();

  const userTypeLabels = {
    client: "Cliente",
    professional: "Profissional",
    organization: "Organização",
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Personal Info
        if (!formData.firstName.trim())
          newErrors.firstName = "firstName é obrigatório";
        if (!formData.lastName.trim())
          newErrors.lastName = "lastName é obrigatório";
        if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "E-mail inválido";
        if (!formData.phone.trim()) newErrors.phone = "phone é obrigatório";
        break;

      case 1: // Security
        if (!formData.password) newErrors.password = "password é obrigatória";
        else if (formData.password.length < 8)
          newErrors.password = "password deve ter pelo menos 8 caracteres";
        if (!formData.passwordConfirmation)
          newErrors.passwordConfirmation =
            "Confirmação de password é obrigatória";
        else if (formData.password !== formData.passwordConfirmation)
          newErrors.passwordConfirmation = "As senhas não coincidem";
        break;

      case 2: // Documentation
        if (!formData.cpf.trim()) newErrors.cpf = "cpf é obrigatório";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (
      !validateStep(SIGNUP_STEPS.findIndex((step) => step.id === currentStepId))
    ) {
      return;
    }

    const currentStepIndex = SIGNUP_STEPS.findIndex(
      (step) => step.id === currentStepId
    );
    if (currentStepIndex < SIGNUP_STEPS.length - 2) {
      // Changed from < 2 to < SIGNUP_STEPS.length - 2 to account for 0-indexed steps and the success step (last step)
      nextStep();
    } else {
      // Final step - submit form
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(userType);

    try {
      // Simular cadastro
      var user = {
        email: formData.email,
        username: formData.email,
        password: formData.password,
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          cpf: formData.cpf,
          phone: formData.phone,
        },
        role: userType,
      };
      if (userType === "client") {
        const client = {
          ...user,
          client: {
            professionalReferralCode: null,
          },
          professional: null,
        };
        Meteor.call("users.create", client);
      }
      if (userType === "professional") {
        const professional = {
          ...user,
          professional: {
            code: generateAlphanumericCode(),
            company: {
              name: formData?.companyName,
              cnpj: formData?.cnpj,
            },
          },
          client: null,
        };
        console.log(professional);
        Meteor.call("users.create", professional);
      }
      addToast("Conta criada com sucesso", "success");
      nextStep(); // Go to success step
    } catch (error) {
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    const currentStepIndex = SIGNUP_STEPS.findIndex(
      (step) => step.id === currentStepId
    );

    switch (currentStepIndex) {
      case 0:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 1:
        return (
          formData.password &&
          formData.passwordConfirmation &&
          formData.password === formData.passwordConfirmation &&
          formData.password.length >= 8
        );
      case 2:
        return formData.cpf;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Criar Conta
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Preencha os dados para criar sua conta
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Wizard Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-8rem)]">
          <Wizard steps={SIGNUP_STEPS}>
            <WizardHeader />

            <WizardContent>
              <WizardStep stepId="personal">
                <PersonalInfoStep
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              </WizardStep>

              <WizardStep stepId="security">
                <SecurityStep
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              </WizardStep>

              <WizardStep stepId="documentation">
                <DocumentationStep
                  userType={userType}
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              </WizardStep>

              <WizardStep stepId="success">
                <SuccessStep userName={formData.firstName} />
              </WizardStep>
            </WizardContent>

            {currentStepId !== "success" && (
              <WizardFooter
                onNext={handleNext}
                onPrev={prevStep}
                nextDisabled={!canProceed()}
                isLoading={isLoading}
                finishLabel="Criar Conta"
              />
            )}
          </Wizard>
        </div>
      </div>
    </div>
  );
}
