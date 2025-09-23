import './App.css'
import Login from './pages/auth/Login'
import Pessoa from './pages/Pessoa'
import Logout from './pages/auth/Logout'
import { useAuth } from './hooks/useAuth'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/pessoas"
          element={
            <PrivateRoute>
              <Pessoa />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to="/pessoas" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
