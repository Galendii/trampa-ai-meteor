import { Check, Sparkles } from "lucide-react";
import React from "react";

interface SuccessStepProps {
  userName: string;
}

export default function SuccessStep({ userName }: SuccessStepProps) {
  return (
    <div className="text-center py-8">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        Conta criada com sucesso!
      </h3>
      <p className="text-slate-600 mb-6">
        Bem-vindo ao Trampa AI, <strong>{userName}</strong>! Você será
        redirecionado para o dashboard em instantes.
      </p>

      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-primary-800 mb-2">
          🎉 Próximos passos:
        </h4>
        <ul className="text-sm text-primary-700 space-y-1">
          <li>• Configure seu perfil</li>
          <li>• Adicione seus primeiros clientes</li>
          <li>• Explore o dashboard</li>
        </ul>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" />
        <div
          className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        />
      </div>
    </div>
  );
}
