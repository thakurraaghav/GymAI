import type { UserProfile } from "../types";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function post(path: string, body: object) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${BASE_URL}/api${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok)
    throw new Error(
      (await res.json().catch(() => ({}))).error || "Request failed",
    );

  return res.json();
}

async function get(path: string) {
  const headers = await getAuthHeaders();
  // Remove Content-Type for GET
  delete headers["Content-Type"];
  
  const res = await fetch(`${BASE_URL}/api${path}`, {
    method: "GET",
    headers,
  });
  if (!res.ok)
    throw new Error(
      (await res.json().catch(() => ({}))).error || "Request failed",
    );
  return res.json();
}
export const api = {
  saveProfile: (
    userId: string,
    profile: Omit<UserProfile, "userId" | "updatedAt">,
  ) => {
    return post("/profile", { userId, ...profile });
  },

  generatePlan: (userId: string) => {
    return post("/plan/generate", { userId });
  },

  getCurrentPlan: (userId: string) => {
    return get(`/plan/current?userId=${userId}`);
  },

  getPlanHistory: (userId: string) => {
    return get(`/plan/history?userId=${userId}`);
  },

  // Auth endpoints
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (data: any) => {
    return post("/auth/login", data);
  },
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (data: any) => {
    return post("/auth/register", data);
  },

  me: () => {
    return get("/auth/me");
  }
};
