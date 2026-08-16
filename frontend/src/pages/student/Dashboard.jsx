import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/AuthContext';

/**
 * Phase 2 — Temporary protected dashboard (placeholder only)
 */
export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Card>
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Student Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-stone-900">
          Welcome, {user?.name || 'Student'}
        </h1>
        <p className="mt-4 text-stone-700">Authentication successful.</p>
        <p className="mt-2 text-sm text-stone-500">
          This is a temporary dashboard for Phase 2 testing. More features will be added in later phases.
        </p>
        <div className="mt-8">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}
