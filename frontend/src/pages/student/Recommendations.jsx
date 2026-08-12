import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getRecommendations } from '../../services/recommendationService';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecommendations()
      .then((res) => setRecommendations(res.data.recommendations || []))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load recommendations.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">YOUR PERSONALIZED RECOMMENDATIONS</h1>
      <p className="text-stone-600 mb-6">Ranked by content-based matching from your interest assessment.</p>
      <ErrorMessage message={error} />
      {error && error.includes('assessment') && (
        <Link to="/student/assessment"><Button className="mb-4">Take Assessment</Button></Link>
      )}
      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <Card key={`${rec.course}-${idx}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold uppercase text-stone-900">{rec.course}</h3>
                <p className="mt-1 text-2xl font-extrabold text-teal-800">{rec.score}% MATCH</p>
                <p className="mt-2 text-sm text-stone-600 max-w-xl">{rec.reason}</p>
              </div>
              {rec.courseId && (
                <Link to={`/courses/${rec.courseId}`}>
                  <Button>VIEW COURSE</Button>
                </Link>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
