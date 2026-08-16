import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ComingSoon from './pages/ComingSoon';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/student/Dashboard';
import Profile from './pages/student/Profile';

/**
 * Phase 1 + Phase 2 + Phase 3
 * Later-phase routes use ComingSoon placeholders only (no fake logic).
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

              {/* Navigation targets for later phases — no feature logic yet */}
              <Route
                path="/student/assessment"
                element={
                  <ProtectedRoute role="student">
                    <ComingSoon title="Interest Assessment" phaseHint="Phase 4" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/recommendations"
                element={
                  <ProtectedRoute role="student">
                    <ComingSoon title="Smart Recommendations" phaseHint="Phase 5" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/classes"
                element={
                  <ProtectedRoute role="student">
                    <ComingSoon title="Weekend / Holiday Classes" phaseHint="Phase 7" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student/progress"
                element={
                  <ProtectedRoute role="student">
                    <ComingSoon title="My Progress" phaseHint="Phase 8" />
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
