// TitouneOS — API client (proxy vers le backend FastAPI)
// Backend local : http://localhost:8001
// Backend prod : https://titounex-backend.onrender.com

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8001",
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
    if (err.response?.status === 401) {
      localStorage.removeItem("tp_token");
      window.location.href = "/auth/signin";
    }
    return Promise.reject(err);
  }
);

// === ENDPOINTS IA ===
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
