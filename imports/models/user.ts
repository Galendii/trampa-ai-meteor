export type UserRole = "client" | "professional" | "admin";

export type ProfessionalData = {
  code: string;
  companyName?: string;
  cnpj?: string;
};

export type ClientData = {
  professionalReferralCode?: string;
};

export type UserSignupInput = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cpf: string;
  phone: string;
  username: string;
  role: UserRole;
} & ClientData &
  ProfessionalData;
