import { useState } from 'react';

interface AuthResponse {
  data: {
    id: number;
    accessToken: string;
  };
  message: string;
}

interface User {
  id: number;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('@App:user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = async (credentials: LoginCredentials) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/v1/user/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      const userData: User = {
        id: data.data.id,
        token: data.data.accessToken,
      };

      setUser(userData);
      localStorage.setItem('@App:user', JSON.stringify(userData));

      return data;
      
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('@App:user');
  };

  return {
    user,
    authenticate,
    logout,
    isAuthenticated: !!user,
    isLoading,
    error
  };
}