import { useAuth } from "@/contexts/AuthContext"

export function useAdminAccess() {
  const { user: sessionUser } = useAuth()
  
  return sessionUser?.userType === 'ADMIN'
}
