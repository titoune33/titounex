"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import api, { login as apiLogin, register as apiRegister, loginWithGoogle as apiLoginWithGoogle } from "@/lib/backend-api";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  plan?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Vérifie le token au chargement
  useEffect(() => {
    const token = localStorage.getItem("tp_token");
    const userData = localStorage.getItem("tp_user");

    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
      } catch {
        localStorage.removeItem("tp_token");
        localStorage.removeItem("tp_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiLogin(email, password);
      const { access_token, user: userData } = res.data;
      localStorage.setItem("tp_token", access_token);
      localStorage.setItem("tp_user", JSON.stringify(userData));
      setUser(userData);
      router.push("/dashboard/dashboard");
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    apiLoginWithGoogle("/dashboard/dashboard");
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiRegister(name, email, password);
      const { access_token, user: userData } = res.data;
      localStorage.setItem("tp_token", access_token);
      localStorage.setItem("tp_user", JSON.stringify(userData));
      setUser(userData);
      router.push("/dashboard/dashboard");
    } catch (err: any) {
      throw new Error(err.response?.data?.detail || err.response?.data?.error || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("tp_token");
    localStorage.removeItem("tp_user");
    setUser(null);
    router.push("/auth/signin");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
