"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("tp_token");
    const storedUser = localStorage.getItem("tp_user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001"}/api/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ username: email, password }),
    });
    if (!res.ok) throw new Error("Credentiels invalides");
    const data = await res.json();
    localStorage.setItem("tp_token", data.access_token);
    const payload = JSON.parse(atob(data.access_token.split(".")[1]));
    const userObj = {
      id: payload.sub,
      name: payload.name || "",
      email: payload.email || "",
      role: payload.role || "USER",
    };
    localStorage.setItem("tp_user", JSON.stringify(userObj));
    setToken(data.access_token);
    setUser(userObj);
    router.push("/dashboard/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("tp_token");
    localStorage.removeItem("tp_user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};