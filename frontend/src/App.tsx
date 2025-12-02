import './App.css'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import { useAuth } from './contexts/AuthContext'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProjectPage from './pages/projects/Index'
import { AppMenu } from './components/app-menu'
import ContentWrapper from './components/content-wrapper'
import RequirementPage from './pages/projects/requirements/Index'
import RequirementVersionPage from './pages/projects/requirements/versions/Index'
import { AuthProvider } from './contexts/AuthContext'
import UserPage from './pages/users/Index'
import HomePage from './pages/home/Index'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    
    return <ContentWrapper>
      <div>Carregando...</div>
    </ContentWrapper>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <ContentWrapper>
                  <AppMenu />
                  <hr />
                  <UserPage />
                </ContentWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ContentWrapper>
                  <AppMenu />
                  <hr />
                  <ProjectPage />
                </ContentWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/requirements"
            element={
              <PrivateRoute>
                <ContentWrapper>
                  <RequirementPage />
                </ContentWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/projects/:projectId/requirements/:requirementId/versions"
            element={
              <PrivateRoute>
                <ContentWrapper>
                  <RequirementVersionPage />
                </ContentWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ContentWrapper>
                  <HomePage />
                </ContentWrapper>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
