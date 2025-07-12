import React from "react";

import { FileText, Building2 } from "lucide-react";
import Input from "../ui/Input";
import { Button } from "../ui/Button";

interface DocumentationStepProps {
  formData: {
    cpf: string;
    cnpj?: string;
    companyName?: string;
  };
  updateFormData: (field: string, value: string) => void;
  errors?: Record<string, string>;
  userType: "professional" | "client" | "organization";
}

export default function DocumentationStep({
  formData,
  updateFormData,
  errors,
  userType,
}: DocumentationStepProps) {
  const formatDocument = (value: string, type: "cpf" | "cnpj") => {
    const numbers = value.replace(/\D/g, "");

    if (type === "cpf") {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    } else {
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Documentação
        </h3>
        <p className="text-slate-600">Precisamos validar sua identidade</p>
      </div>

      <Input.Root
        type="text"
        onChange={(e) => updateFormData("cpf", formatDocument(e, "cpf"))}
        initialValue={formData.cpf}
      >
        <Input.Label>CPF</Input.Label>
        <Input.Icon />
        <Input.Field error={errors?.cpf} />
      </Input.Root>

      {userType === "professional" && (
        <React.Fragment>
          <Input.Root
            type="text"
            onChange={(e) => updateFormData("cnpj", formatDocument(e, "cnpj"))}
            initialValue={formData.cnpj}
          >
            <Input.Label>CNPJ</Input.Label>
            <Input.Icon />
            <Input.Field error={errors?.cnpj} />
          </Input.Root>
          <Input.Root
            type="text"
            onChange={(e) => updateFormData("companyName", e)}
            initialValue={formData.companyName}
          >
            <Input.Label>Nome da empresa</Input.Label>
            <Input.Icon />
            <Input.Field error={errors?.companyName} />
          </Input.Root>
        </React.Fragment>
      )}
    </div>
  );
}
