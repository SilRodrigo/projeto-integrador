import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/login" replace />;
}
