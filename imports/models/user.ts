import { ServiceModel } from "./service";

export type UserRole = "client" | "professional" | "admin";

export type ProfessionalData = {
  code: string;
  companyName?: string;
  cnpj?: string;
};

export type ClientData = {
  professionalReferralCode?: string;
  services?: ServiceModel[];
};

export type UserSignupInput = {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
    cpf: string;
    phone: string;
  };
  role: UserRole;
  professional?: ProfessionalData;
  client?: ClientData;
};
