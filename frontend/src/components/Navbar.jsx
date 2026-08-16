import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

export default function Navbar() {
  const { isAuthenticated, role, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive ? 'text-teal-800' : 'text-stone-700 hover:text-teal-700'}`;

  return (
    <header className="border-b border-stone-200/80 bg-[#f7f4ef]/90 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="font-bold tracking-tight text-teal-800 text-lg">
          SMART COMMUNITY EDUCATION
        </Link>
        <nav className="flex flex-wrap items-center gap-4">
          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={linkClass}>
                Student Login
              </NavLink>
              <Button onClick={() => navigate('/register')}>Get Started</Button>
            </>
          )}
          {isAuthenticated && role === 'student' && (
            <>
              <NavLink to="/student/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <span className="text-sm text-stone-500 hidden sm:inline">{user?.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
