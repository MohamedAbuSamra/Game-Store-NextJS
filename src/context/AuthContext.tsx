'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { fetchUserProfile } from "../api/users";

export interface User {
  id: string;
  username: string;
  // Add other user fields as needed
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  authError: boolean;
  setAuthError: (val: boolean) => void;
  transactionCount: number;
  incrementTransactionCount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetchUserProfile();
      // If the API returns a guest/anonymous user, treat as not authenticated
      if (!res.user || res.user.username === "guest" || res.user.isGuest) {
        setUser(null);
        setTransactionCount(0);
        // Optionally: redirect to login here if needed
      } else {
        setUser(res.user);
        setTransactionCount(res.transaction_count || 0);
      }
    } catch (e) {
      setUser(null);
      setTransactionCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
      fetchProfile(); // Always use fetchProfile to manage loading
    } else {
      setToken(null);
      setUser(null);
      setTransactionCount(0);
      setLoading(false);
    }
  }, []);

  const login = (jwt: string, userObj: User) => {
    Cookies.set("token", jwt, { expires: 7 });
    Cookies.set("user", JSON.stringify(userObj), { expires: 7 });
    setToken(jwt);
    setUser(userObj);
    setAuthError(false);
    fetchUserProfile();
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
    setTransactionCount(0);
  };

  const incrementTransactionCount = () => setTransactionCount((c) => c + 1);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading, authError, setAuthError, transactionCount, incrementTransactionCount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
