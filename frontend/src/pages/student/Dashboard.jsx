import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getDashboard } from '../../services/studentService';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="mx-auto max-w-6xl px-4 py-8"><ErrorMessage message={error} /></div>;
  if (!data) return null;

  const { student, assessmentStatus, recommendationStatus, classStatus, progressPercent } = data;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold text-stone-900">Welcome, {student.fullName}</h1>
      <div className="mt-2 flex flex-wrap gap-4 text-sm text-stone-600">
        <p><span className="font-semibold text-stone-800">Student Class:</span> {student.classGrade}</p>
        <p><span className="font-semibold text-stone-800">Location:</span> {student.location}</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="ASSESSMENT">
          <p className="text-sm text-stone-600">Status: <span className="font-semibold text-teal-800">{assessmentStatus}</span></p>
        </Card>
        <Card title="RECOMMENDATION">
          <p className="text-sm text-stone-600">Status: <span className="font-semibold text-teal-800">{recommendationStatus}</span></p>
        </Card>
        <Card title="WEEKEND CLASS">
          <p className="text-sm text-stone-600">Status: <span className="font-semibold text-teal-800">{classStatus}</span></p>
        </Card>
        <Card title="PROGRESS">
          <p className="text-sm text-stone-600 mb-2">Overall: <span className="font-semibold text-teal-800">{progressPercent}%</span></p>
          <div className="h-2 w-full bg-stone-200">
            <div className="h-2 bg-teal-700 transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </Card>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/student/assessment"><Button>Take Assessment</Button></Link>
        <Link to="/student/recommendations"><Button variant="outline">View Recommendations</Button></Link>
        <Link to="/classes"><Button variant="secondary">View Classes</Button></Link>
        <Link to="/student/progress"><Button variant="ghost">View Progress</Button></Link>
      </div>
    </div>
  );
}
