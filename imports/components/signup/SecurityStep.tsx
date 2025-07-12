import React from "react";

import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useState } from "react";
import Input from "../ui/Input";

interface SecurityStepProps {
  formData: {
    password: string;
    passwordConfirmation: string;
  };
  updateFormData: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export default function SecurityStep({
  formData,
  updateFormData,
  errors,
}: SecurityStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Segurança</h3>
        <p className="text-slate-600">
          Crie uma senha segura para proteger sua conta
        </p>
      </div>

      <Input.Root
        type="password"
        onChange={(e) => updateFormData("password", e)}
        initialValue={formData.password}
      >
        <Input.Label>Password</Input.Label>
        <Input.Icon IconComponent={Lock} />
        <Input.Field error={errors?.password} />
      </Input.Root>
      <p className="text-xs text-slate-500 mt-1">Mínimo 8 caracteres</p>

      <Input.Root
        type="password"
        onChange={(e) => updateFormData("passwordConfirmation", e)}
        initialValue={formData.passwordConfirmation}
      >
        <Input.Label>Password</Input.Label>
        <Input.Icon IconComponent={Lock} />
        <Input.Field error={errors?.passwordConfirmation} />
      </Input.Root>

      {/* Password Strength Indicator */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-700">Força da senha:</p>
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full ${
                formData.password.length >= level * 2
                  ? level <= 2
                    ? "bg-red-400"
                    : level === 3
                    ? "bg-yellow-400"
                    : "bg-emerald-400"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
