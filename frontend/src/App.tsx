import './App.css'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'
import { useAuth } from './hooks/useAuth'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProjectPage from './pages/project/Index'
import { AppMenu } from './components/app-menu'
import ContentWrapper from './components/content-wrapper'
import RequirementPage from './pages/requirement/Index'
import { ReturnButton } from './components/return-button'

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
          path="/projects"
          element={
            /* <PrivateRoute> */
            <ContentWrapper>
              <AppMenu />
              <hr />
              <ProjectPage />
            </ContentWrapper>
            /* </PrivateRoute> */
          }
        />
        <Route
          path="/projects/:projectId/requirements"
          element={
            <ContentWrapper>
              <RequirementPage />
            </ContentWrapper>
          }
        />

        <Route
          path="/"
          element={<Navigate to="/projects" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
