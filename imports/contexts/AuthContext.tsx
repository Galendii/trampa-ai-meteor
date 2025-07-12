import React, { useContext, createContext, useState, useCallback } from "react";
import { UserModel } from "../models/user";
import { AuthenticationModel } from "../models/authentication";

type InitialStateType = {
  user: UserModel | null;
  isUserLoggedIn: boolean;
  login: (auth: AuthenticationModel) => void;
  logout: (redirectUrl?: string) => void;
  refreshAccessToken?: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactElement;
  user?: UserModel | null;
};

const InitialState: InitialStateType = {
  user: null,
  isUserLoggedIn: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(InitialState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
  user: initialUser,
}: // refreshAccessTokenService,
AuthProviderProps) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState<UserModel | null>(null);
  const isUserLoggedIn = !!user;
  const login = useCallback((auth: AuthenticationModel) => {}, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
