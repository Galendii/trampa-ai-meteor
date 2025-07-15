import React, { useMemo, useState } from "react";
import { X, User, Lock, FileText, Check, ClipboardList } from "lucide-react";
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
import PlanSelectionStep from "../signup/PlanSelectionStep";

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

  // Step 4
  plan: "free" | "basic" | "premium";
}

export const CLIENT_STEPS = [
  { id: "personal", title: "Dados Pessoais", icon: User },
  { id: "security", title: "Segurança", icon: Lock },
  { id: "documentation", title: "Documentação", icon: FileText },
  { id: "success", title: "Sucesso", icon: Check },
];

export const PROFESSIONAL_STEPS = [
  { id: "plan", title: "Plano", icon: ClipboardList },
  { id: "personal", title: "Dados Pessoais", icon: User },
  { id: "security", title: "Segurança", icon: Lock },
  { id: "documentation", title: "Documentação", icon: FileText },
  { id: "success", title: "Sucesso", icon: Check },
];

export const ORGANIZATION_STEPS = [
  { id: "personal", title: "Dados Pessoais", icon: User },
  { id: "security", title: "Segurança", icon: Lock },
  { id: "documentation", title: "Documentação", icon: FileText },
  { id: "plan", title: "Plano", icon: ClipboardList },
  { id: "success", title: "Sucesso", icon: Check },
];

export default function SignupWizard({ userType, onClose }: SignupWizardProps) {
  const { currentStepId, nextStep, prevStep, formData, isLastStep } =
    useWizard();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(userType);

    try {
      const { passwordConfirmation, ...rest } = formData;
      const payload = {
        ...rest,
        username: rest.email,
      };

      await Meteor.callAsync("users.create", payload);
      addToast("Conta criada com sucesso", "success");
      nextStep();
    } catch (error) {
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (isLastStep) {
      await handleSubmit();
      return;
    }
    nextStep();
    return;
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
          <Wizard>
            <WizardHeader />

            <WizardContent>
              <WizardStep stepId="personal">
                <PersonalInfoStep />
              </WizardStep>

              <WizardStep stepId="security">
                <SecurityStep />
              </WizardStep>

              <WizardStep stepId="documentation">
                <DocumentationStep />
              </WizardStep>
              <WizardStep stepId="plan">
                <PlanSelectionStep />
              </WizardStep>

              <WizardStep stepId="success">
                <SuccessStep userName={formData.firstName} />
              </WizardStep>
            </WizardContent>

            {currentStepId !== "success" && (
              <WizardFooter
                onNext={handleNext}
                onPrev={prevStep}
                // nextDisabled={!canProceed()}
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
