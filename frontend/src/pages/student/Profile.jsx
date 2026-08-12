import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getProfile } from '../../services/studentService';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => setProfile(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load profile.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Card title="Student Profile">
        <ErrorMessage message={error} />
        {profile && (
          <dl className="grid gap-3 sm:grid-cols-2 text-sm">
            {[
              ['Full Name', profile.fullName],
              ['Age', profile.age],
              ['Class', profile.classGrade],
              ['School', profile.school],
              ['Location', profile.location],
              ['Language', profile.preferredLanguage],
              ['Parent Contact', profile.parentContact],
              ['Username', profile.username],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-semibold text-stone-800">{k}</dt>
                <dd className="text-stone-600">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Card>
    </div>
  );
}
