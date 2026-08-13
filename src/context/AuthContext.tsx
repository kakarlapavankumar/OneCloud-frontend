import { createContext, useContext, useState, type ReactNode } from "react";

import type { LoginCredentials, RegisterData, User } from "../types";

import {
  getCurrentUser,
  isAuthenticated,
  login,
  logout,
  register,
} from "../services/auth/authService";

interface AuthContextType {
  user: User | null;
  authenticated: boolean;
  loginUser: (credentials: LoginCredentials) => Promise<void>;
  registerUser: (data: RegisterData) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  async function loginUser(credentials: LoginCredentials) {
    const loggedUser = await login(credentials);

    setUser(loggedUser);
    setAuthenticated(true);
  }

  async function registerUser(data: RegisterData) {
    const newUser = await register(data);

    setUser(newUser);
    setAuthenticated(true);
  }

  function logoutUser() {
    logout();
    setUser(null);
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        authenticated,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
}
