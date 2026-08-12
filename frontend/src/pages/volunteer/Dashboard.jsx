import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getVolunteerDashboard } from '../../services/volunteerService';

export default function VolunteerDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVolunteerDashboard()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">Welcome, Volunteer</h1>
      <ErrorMessage message={error} />
      {data && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Card title="Registered Students">
              <p className="text-3xl font-extrabold text-teal-800">{data.registeredStudents}</p>
            </Card>
            <Card title="Available Classes">
              <p className="text-3xl font-extrabold text-teal-800">{data.availableClasses}</p>
            </Card>
          </div>

          <div className="mt-6">
            <Link to="/volunteer/classes"><Button>Manage Classes</Button></Link>
          </div>

          <Card className="mt-8" title="Student List">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-left">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Class</th>
                    <th className="py-2 pr-4">Location</th>
                    <th className="py-2">Assessment</th>
                  </tr>
                </thead>
                <tbody>
                  {data.students.map((s) => (
                    <tr key={s._id} className="border-b border-stone-100">
                      <td className="py-2 pr-4">{s.fullName}</td>
                      <td className="py-2 pr-4">{s.classGrade}</td>
                      <td className="py-2 pr-4">{s.location}</td>
                      <td className="py-2">{s.assessmentCompleted ? 'Completed' : 'Not Completed'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.students.length === 0 && (
                <p className="text-stone-500 py-4">No students registered yet.</p>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
