import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getProgress } from '../../services/studentService';

export default function Progress() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProgress()
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load progress.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Progress</h1>
      <ErrorMessage message={error} />
      {data && (
        <Card>
          <p className="text-lg font-semibold mb-4">{data.fullName}</p>
          <ul className="space-y-3 text-sm text-stone-700">
            <li>Assessment: {data.assessmentCompleted ? 'Completed ✓' : 'Not Completed'}</li>
            <li>Recommended Skill: {data.recommendedSkill}</li>
            <li>Weekend Class: {data.classRegistered ? 'Registered ✓' : 'Not Registered'}</li>
            <li>
              Learning:{' '}
              {data.learningProgress?.completedModules?.length
                ? `Module ${Math.max(...data.learningProgress.completedModules) + 1} Completed ✓`
                : 'Not started'}
            </li>
            <li>
              Latest Quiz:{' '}
              {data.latestQuiz ? `${data.latestQuiz.percentage}% (${data.latestQuiz.performance})` : 'Not taken'}
            </li>
          </ul>
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">Overall Progress: {data.overallProgress}%</p>
            <div className="h-3 w-full bg-stone-200">
              <div className="h-3 bg-teal-700 transition-all" style={{ width: `${data.overallProgress}%` }} />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
