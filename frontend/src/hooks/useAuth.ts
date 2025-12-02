import { useState, useEffect, useCallback } from "react";

interface AuthResponse {
  data: {
    accessToken: string;
    user: User;
  };
}

interface User {
  id: string
  email: string;
  createdAt: Date
  updatedAt: Date,
  userType: 'ADMIN' | 'USER'
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/api/v1/user/auth', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha ao fazer login");
      }

      const { data }: AuthResponse = await response.json();

      localStorage.setItem("authToken", data.accessToken);
      setToken(data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setIsLoading(false);

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const getAuthHeader = useCallback(() => {
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  }, [token]);

  return {
    token,
    user,
    isLoading,
    error,
    login,
    logout,
    getAuthHeader,
    isAuthenticated: !!token,
  };
}