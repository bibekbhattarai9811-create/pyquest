"use client";

import { createContext, useContext, type ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "PENDING" | "APPROVED" | "BLOCKED";
}

const AuthContext = createContext<{ user: AuthUser | null }>({ user: null });

export function AuthProvider({
  user,
  children,
}: {
  user: AuthUser | null;
  children: ReactNode;
}) {
  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
