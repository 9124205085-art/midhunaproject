import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, role: userRole, loading } = useAuth();

  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to={role === 'volunteer' ? '/volunteer/login' : '/login'} replace />;
  if (role && userRole !== role) {
    return <Navigate to={userRole === 'volunteer' ? '/volunteer/dashboard' : '/student/dashboard'} replace />;
  }
  return children;
}
