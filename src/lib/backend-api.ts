// src/lib/backend-api.ts
// TitouneOS — API client unifié (proxy vers le backend FastAPI)

import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001";

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 30000,
});

// Interceptor — ajoute le token JWT
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("tp_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor — redirection 401
api.interceptors.response.use(
  (res) => res,
  (err: any) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("tp_token");
      window.location.href = "/auth/signin";
    }
    return Promise.reject(err);
  }
);

// === AUTH ===
export const login = (email: string, password: string) =>
  api.post("/api/auth/login", { email, password });

export const register = (name: string, email: string, password: string) =>
  api.post("/api/auth/register", { name, email, password });

export interface AuthResult {
  access_token: string;
  token_type: string;
  user: { id: string; name: string; email: string; plan: string };
}

/**
 * Google OAuth — appelle le backend pour récupérer l'URL d'autorisation Google,
 * puis redirige l'utilisateur navigateur vers Google.
 */
export async function loginWithGoogle(callbackUrl: string = "/dashboard/dashboard"): Promise<void> {
  const res = await api.get("/api/auth/google", { params: { callbackUrl } });
  const { auth_url } = res.data;
  if (!auth_url) {
    throw new Error("Google OAuth non configuré");
  }
  window.location.href = auth_url;
}

// === IA ===
export const summarize = (text: string) => api.post("/api/ai/summarize", { text });
export const generateText = (prompt: string, options?: Record<string, unknown>) =>
  api.post("/api/ai/generate", { prompt, ...options });
export const classifyText = (text: string) => api.post("/api/ai/classify", { text });
export const extractData = (text: string) => api.post("/api/ai/extract", { text });
export const getModels = () => api.get("/api/ai/models");

// === CONNECTORS ===
export const getConnectors = () => api.get("/api/connectors");

// === WORKFLOWS ===
export const executeWorkflow = (flow: unknown) =>
  api.post("/api/workflows/execute", { flow });

export default api;