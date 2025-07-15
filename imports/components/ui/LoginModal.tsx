import React, { useCallback } from "react";

import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, Key } from "lucide-react";
import PWAInstallBanner from "./PWAInstallBanner";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "/imports/contexts/AuthContext";
import { useToast } from "/imports/contexts/ToastContext";
import { UserLoginType } from "../../models/authentication";
import Input from "./Input";
import Button from "./Button";
import GoogleLoginButton from "./google-login-button";
import Modal, { ModalProps } from "./Modal";
import { Meteor } from "meteor/meteor";

interface LoginModalProps {
  userType: "cliente" | "profissional" | "organizacao";
  onClose: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const { mutate: login } = useLogin();
  const { login: contextLogin } = useAuthContext();
  const { addToast } = useToast();

  const userTypeLabels = {
    cliente: "Cliente",
    profissional: "Profissional",
    organizacao: "Organização",
  };
  const userTypePaths: Record<
    "cliente" | "profissional" | "organizacao",
    UserLoginType
  > = {
    cliente: "clients",
    profissional: "professionals",
    organizacao: "professionals",
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        await new Promise<void>((resolve, reject) => {
          Meteor.loginWithPassword(email, password, (err) => {
            if (err) return reject(err);
            resolve();
          });
        });

        addToast(
          `Bem-vindo, ${Meteor.user()?.profile?.firstName || "usuário"}`
        );
        navigate("/dashboard");
      } catch (err: any) {
        addToast(err.message || String(err), "danger");
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, addToast, navigate]
  );

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    // Simular login com Google
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Redirecionar para dashboard
    navigate("/dashboard");
  };

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        {/* Header */}
        <h2 className="text-xl font-bold text-slate-800">Login</h2>
        <p className="text-sm text-slate-600 mt-1">
          Entre com suas credenciais
        </p>
        {/* PWA Install Banner */}
        <div className="px-6 pb-4">
          <PWAInstallBanner variant="card" />
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <Input.Root type="email" onChange={setEmail} initialValue={email}>
            <Input.Label>Your E-mail Address</Input.Label>
            <Input.Icon IconComponent={Mail} />
            <Input.Field placeholder="john.doe@example.com" />
          </Input.Root>

          {/* Password */}
          <Input.Root
            type="password"
            onChange={setPassword}
            initialValue={password}
          >
            <Input.Label>Password</Input.Label>
            <Input.Icon IconComponent={Key} />
            <Input.Field placeholder="*******" />
          </Input.Root>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Entrar</span>
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-slate-200"></div>
          <span className="px-4 text-sm text-slate-500">ou</span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>

        {/* Google Login */}
        <GoogleLoginButton onClick={handleGoogleLogin} disabled={isLoading} />
      </Modal.Body>
    </Modal.Root>
  );
}
