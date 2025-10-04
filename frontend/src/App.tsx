import './App.css'
import Login from './pages/auth/Login'
import Pessoa from './pages/Treino'
import Logout from './pages/auth/Logout'
import { useAuth } from './hooks/useAuth'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import TreinoPage from './pages/Treino'
import { AppMenu } from './components/app-menu'
import ContentWrapper from './components/content-wrapper'

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
          path="/treinos"
          element={
            /* <PrivateRoute> */
            <ContentWrapper>
              <AppMenu />
              <TreinoPage />
            </ContentWrapper>
            /* </PrivateRoute> */
          }
        />
        <Route
          path="/"
          element={<Navigate to="/treinos" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
