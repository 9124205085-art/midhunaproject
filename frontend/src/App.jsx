import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ClassDetails from './pages/classes/ClassDetails';
import ClassList from './pages/classes/ClassList';
import CourseDetails from './pages/courses/CourseDetails';
import CourseList from './pages/courses/CourseList';
import Learning from './pages/courses/Learning';
import Quiz from './pages/quiz/Quiz';
import QuizResult from './pages/quiz/QuizResult';
import Assessment from './pages/student/Assessment';
import Dashboard from './pages/student/Dashboard';
import MyClasses from './pages/student/MyClasses';
import Profile from './pages/student/Profile';
import Progress from './pages/student/Progress';
import Recommendations from './pages/student/Recommendations';
import VolunteerDashboard from './pages/volunteer/Dashboard';
import VolunteerLogin from './pages/volunteer/Login';
import ManageClasses from './pages/volunteer/ManageClasses';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/volunteer/login" element={<VolunteerLogin />} />

              <Route path="/student/dashboard" element={<ProtectedRoute role="student"><Dashboard /></ProtectedRoute>} />
              <Route path="/student/profile" element={<ProtectedRoute role="student"><Profile /></ProtectedRoute>} />
              <Route path="/student/assessment" element={<ProtectedRoute role="student"><Assessment /></ProtectedRoute>} />
              <Route path="/student/recommendations" element={<ProtectedRoute role="student"><Recommendations /></ProtectedRoute>} />
              <Route path="/student/my-classes" element={<ProtectedRoute role="student"><MyClasses /></ProtectedRoute>} />
              <Route path="/student/progress" element={<ProtectedRoute role="student"><Progress /></ProtectedRoute>} />

              <Route path="/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>} />
              <Route path="/courses/:courseId" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
              <Route path="/learning/:courseId" element={<ProtectedRoute role="student"><Learning /></ProtectedRoute>} />

              <Route path="/classes" element={<ProtectedRoute><ClassList /></ProtectedRoute>} />
              <Route path="/classes/:classId" element={<ProtectedRoute><ClassDetails /></ProtectedRoute>} />

              <Route path="/quiz/:courseId" element={<ProtectedRoute role="student"><Quiz /></ProtectedRoute>} />
              <Route path="/quiz/result/:resultId" element={<ProtectedRoute role="student"><QuizResult /></ProtectedRoute>} />

              <Route path="/volunteer/dashboard" element={<ProtectedRoute role="volunteer"><VolunteerDashboard /></ProtectedRoute>} />
              <Route path="/volunteer/classes" element={<ProtectedRoute role="volunteer"><ManageClasses /></ProtectedRoute>} />

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
