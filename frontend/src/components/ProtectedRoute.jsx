import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

/**
 * Phase 2 — Protected Route
 * Unauthenticated users are redirected to /login
 */
export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, role: userRole, loading } = useAuth();

  if (loading) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Structure ready for later role-based access (e.g. volunteer)
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
