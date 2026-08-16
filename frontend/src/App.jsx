import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Assessment from './pages/student/Assessment';
import ClassDetails from './pages/student/ClassDetails';
import Classes from './pages/student/Classes';
import Dashboard from './pages/student/Dashboard';
import ModuleDetails from './pages/student/ModuleDetails';
import MyClasses from './pages/student/MyClasses';
import Profile from './pages/student/Profile';
import Progress from './pages/student/Progress';
import Recommendations from './pages/student/Recommendations';
import SkillDetails from './pages/student/SkillDetails';
import Skills from './pages/student/Skills';

/**
 * Phase 1–8 active.
 */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col overflow-x-hidden">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/student/dashboard"
                element={
                  <ProtectedRoute role="student">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/profile"
                element={
                  <ProtectedRoute role="student">
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/assessment"
                element={
                  <ProtectedRoute role="student">
                    <Assessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/recommendations"
                element={
                  <ProtectedRoute role="student">
                    <Recommendations />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student/skills"
                element={
                  <ProtectedRoute role="student">
                    <Skills />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/skills/:skillId"
                element={
                  <ProtectedRoute role="student">
                    <SkillDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/skills/:skillId/module/:moduleId"
                element={
                  <ProtectedRoute role="student">
                    <ModuleDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student/classes"
                element={
                  <ProtectedRoute role="student">
                    <Classes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/classes/my-registrations"
                element={
                  <ProtectedRoute role="student">
                    <MyClasses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/classes/:classId"
                element={
                  <ProtectedRoute role="student">
                    <ClassDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/student/progress"
                element={
                  <ProtectedRoute role="student">
                    <Progress />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
