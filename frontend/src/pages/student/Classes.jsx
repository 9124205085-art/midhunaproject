import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getClasses } from '../../services/classService';

/**
 * Phase 7 — Weekend & Holiday Learning list
 */
export default function Classes() {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getClasses()
      .then((res) => {
        if (active) setClasses(res.data.classes || []);
      })
      .catch(() => {
        if (active) setError('Unable to load classes. Please try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Loading text="Loading weekend classes..." />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 overflow-x-hidden">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-stone-900 md:text-4xl">
          Weekend & Holiday Learning
        </h1>
        <p className="mt-2 text-stone-600">
          Learn new skills through community classes conducted on weekends and holidays.
        </p>
      </header>

      <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50/80 px-5 py-4">
        <h2 className="font-bold text-teal-900">NO PERSONAL DEVICE? NO PROBLEM.</h2>
        <p className="mt-1 text-sm text-stone-700">
          Students can register with support from teachers or volunteers at participating community
          centres and schools. A personal smartphone is not required.
        </p>
      </div>

      <div className="mb-6">
        <Link to="/student/classes/my-registrations">
          <Button variant="outline">My Weekend Classes</Button>
        </Link>
      </div>

      <ErrorMessage message={error} />

      {!error && classes.length === 0 && (
        <Card className="rounded-xl text-center">
          <p className="font-semibold text-stone-900">No weekend classes are currently available.</p>
          <p className="mt-2 text-sm text-stone-600">Please check again later.</p>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {classes.map((c) => (
          <Card key={c.id} className="rounded-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">{c.skill}</p>
            <h2 className="mt-1 text-xl font-bold text-stone-900">{c.title}</h2>
            <ul className="mt-3 space-y-1 text-sm text-stone-600">
              <li>
                {c.day}, {c.displayDate}
              </li>
              <li>
                {c.startTime} – {c.endTime}
              </li>
              <li>{c.location}</li>
              <li>Facilitator: {c.facilitator}</li>
              <li className="font-semibold text-teal-800">
                Available Seats: {c.availableSeats}
              </li>
              <li>
                Status:{' '}
                <span className="font-semibold">
                  {c.isRegistered ? 'Registered' : c.status}
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to={`/student/classes/${c.id}`}>
                <Button>View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
