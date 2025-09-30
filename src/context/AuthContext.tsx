import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Role = "guest" | "user" | "admin";

type AuthState = {
  isAuthenticated: boolean;
  role: Role;
  username?: string;
};

type AuthContextValue = AuthState & {
  loginAsUser: (username?: string) => void;
  loginAsAdmin: (username?: string) => void;
  logout: () => void;
};

const STORAGE_KEY = "demo-auth-state";

const defaultState: AuthState = {
  isAuthenticated: false,
  role: "guest",
  username: undefined,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as AuthState) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore persistence errors in demo
    }
  }, [state]);

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      loginAsUser: (username?: string) =>
        setState({ isAuthenticated: true, role: "user", username }),
      loginAsAdmin: (username?: string) =>
        setState({ isAuthenticated: true, role: "admin", username }),
      logout: () => setState(defaultState),
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
