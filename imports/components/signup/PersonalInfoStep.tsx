import React from "react";
import { Mail, Phone, User } from "lucide-react";
import Input from "../ui/Input";

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  updateFormData: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export default function PersonalInfoStep({
  formData,
  updateFormData,
  errors,
}: PersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Dados Pessoais
        </h3>
        <p className="text-slate-600">
          Vamos começar com suas informações básicas
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input.Root
          onChange={(val) => updateFormData("firstName", val)}
          initialValue={formData.firstName}
        >
          <Input.Field error={errors?.firstName} placeholder="Nome" />
          <Input.Icon />
        </Input.Root>
        <Input.Root
          onChange={(val) => updateFormData("lastName", val)}
          initialValue={formData.lastName}
        >
          <Input.Field error={errors?.lastName} placeholder="Sobrenome" />
          <Input.Icon />
        </Input.Root>
      </div>

      {/* Email */}
      <Input.Root
        type="email"
        onChange={(val) => updateFormData("email", val)}
        initialValue={formData.email}
      >
        <Input.Label>E-mail</Input.Label>
        <Input.Icon IconComponent={Mail} />
        <Input.Field error={errors?.email} placeholder="john.doe@example.com" />
      </Input.Root>

      <Input.Root
        type="tel"
        onChange={(val) => updateFormData("phone", val)}
        initialValue={formData.phone}
      >
        <Input.Label>Phone Number (Brazil)</Input.Label>
        <Input.Icon IconComponent={Phone} />
        <Input.Field error={errors?.phone} />
      </Input.Root>
    </div>
  );
}
