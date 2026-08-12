import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getMyClasses } from '../../services/classService';

export default function MyClasses() {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyClasses()
      .then((res) => setEnrollments(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load classes.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Weekend / Holiday Classes</h1>
      <ErrorMessage message={error} />
      {enrollments.length === 0 ? (
        <Card>
          <p className="text-stone-600 mb-4">You have not registered for any class yet.</p>
          <Link to="/classes"><Button>Browse Classes</Button></Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {enrollments.map((e) => (
            <Card key={e._id} title={e.classSession?.skill || e.course?.name}>
              <p className="text-sm text-stone-600">{e.classSession?.day} · {e.classSession?.date}</p>
              <p className="text-sm text-stone-600">{e.classSession?.time}</p>
              <p className="text-sm text-stone-600">{e.classSession?.communityCentre}</p>
              <div className="mt-4">
                <Link to={`/learning/${e.course?._id || e.course}`}>
                  <Button>START LEARNING</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
