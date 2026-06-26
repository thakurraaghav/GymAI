import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { TrainingPlan, User, UserProfile } from "../types";
import { api } from "../lib/api";

interface AuthContextType {
  user: User | null;
  plan: TrainingPlan | null;
  isLoading: boolean;
  saveProfile: (
    profile: Omit<UserProfile, "userId" | "updatedAt">,
  ) => Promise<void>;
  generatePlan: () => Promise<void>;
  refreshData: () => Promise<void>;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.me();
        if (response?.user) {
          setUser(response.user);
        }
      } catch (err) {
        console.error("Failed to load user session", err);
        localStorage.removeItem("auth_token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (user?.id) {
        refreshData();
      } else {
        setPlan(null);
      }
    }
  }, [user?.id, isLoading]);

  const refreshData = useCallback(async () => {
    if (!user || isRefreshingRef.current) return;

    isRefreshingRef.current = true;

    try {
      const planData = await api.getCurrentPlan(user.id).catch(() => null);
      if (planData) {
        setPlan({
          id: planData.id,
          userId: planData.userId,
          overview: planData.planJson.overview,
          weeklySchedule: planData.planJson.weeklySchedule,
          progression: planData.planJson.progression,
          version: planData.version,
          createdAt: planData.createdAt,
        });
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      isRefreshingRef.current = false;
    }
  }, [user?.id]);

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">,
  ) {
    if (!user) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(user.id, profileData);
    await refreshData();
  }

  async function generatePlan() {
    if (!user) {
      throw new Error("User must be authenticated to generate plan");
    }

    await api.generatePlan(user.id);
    await refreshData();
  }

  const login = (token: string, userData: User) => {
    localStorage.setItem("auth_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setPlan(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        plan,
        isLoading,
        saveProfile,
        generatePlan,
        refreshData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
