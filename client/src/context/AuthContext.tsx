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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  planHistory: any[];
  fetchPlanHistory: () => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadPlan: (plan: any) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [planHistory, setPlanHistory] = useState<any[]>([]);
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
      }, [user?.id, user]);

  useEffect(() => {
    if (!isLoading) {
      if (user?.id) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        refreshData();
      } else {
        setPlan(null);
      }
    }
    }, [user?.id, isLoading, refreshData]);

  async function saveProfile(
    profileData: Omit<UserProfile, "userId" | "updatedAt">,
  ) {
    if (!user) {
      throw new Error("User must be authenticated to save profile");
    }

    await api.saveProfile(user.id, profileData);
    await // eslint-disable-next-line react-hooks/set-state-in-effect
        refreshData();
  }

  async function generatePlan() {
    if (!user) {
      throw new Error("User must be authenticated to generate plan");
    }

    await api.generatePlan(user.id);
    await // eslint-disable-next-line react-hooks/set-state-in-effect
        refreshData();
    await fetchPlanHistory();
  }

  const login = (token: string, userData: User) => {
    localStorage.setItem("auth_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setPlan(null);
    setPlanHistory([]);
  };

  const fetchPlanHistory = useCallback(async () => {
    if (!user) return;
    try {
      const history = await api.getPlanHistory(user.id);
      setPlanHistory(history || []);
    } catch (err) {
      console.error("Failed to fetch plan history:", err);
    }
  }, [user?.id, user]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loadPlan = (historicalPlan: any) => {
    setPlan({
      id: historicalPlan.id,
      userId: user!.id,
      overview: historicalPlan.planJson.overview,
      weeklySchedule: historicalPlan.planJson.weeklySchedule,
      progression: historicalPlan.planJson.progression,
      version: historicalPlan.version,
      createdAt: historicalPlan.createdAt,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        plan,
        planHistory,
        isLoading,
        saveProfile,
        generatePlan,
        refreshData,
        fetchPlanHistory,
        loadPlan,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
