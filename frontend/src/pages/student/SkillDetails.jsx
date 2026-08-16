import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getSkillById } from '../../data/skills';
import { getSkillProgress } from '../../services/progressService';

/**
 * Phase 6 + Phase 8 — Skill details with learning progress
 */
export default function SkillDetails() {
  const { skillId } = useParams();
  const skill = getSkillById(skillId);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!skill) {
      setLoading(false);
      return;
    }
    let active = true;
    getSkillProgress(skill.id)
      .then((res) => {
        if (active) setProgress(res.data);
      })
      .catch(() => {
        if (active) setError('Unable to load your progress.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [skill]);

  if (!skill) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <Card className="rounded-xl text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-3">Skill not found.</h1>
          <Link to="/student/skills">
            <Button>Back to Skills</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (loading) return <Loading text="Loading your progress..." />;

  const completedMap = Object.fromEntries(
    (progress?.modules || []).map((m) => [m.moduleId, m.completed])
  );
  const percentage = progress?.percentage ?? 0;
  const completedCount = progress?.completedModules ?? 0;
  const total = progress?.totalModules ?? skill.modules.length;
  const status = progress?.status || 'Not Started';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 overflow-x-hidden">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Skill</p>
      <h1 className="mt-1 text-3xl font-bold uppercase text-stone-900">{skill.name}</h1>
      <p className="mt-3 text-stone-600 leading-relaxed">{skill.description}</p>

      <ErrorMessage message={error} />

      <Card className="mt-6 rounded-xl" title={`${skill.name} Learning Progress`}>
        <p className="text-sm text-stone-700">
          {completedCount} / {total} Modules Completed
        </p>
        <p className="mt-1 text-2xl font-extrabold text-teal-800">{percentage}%</p>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-stone-200">
          <div className="h-3 rounded-full bg-teal-700" style={{ width: `${percentage}%` }} />
        </div>
        <p className="mt-2 text-sm font-semibold text-stone-700">Status: {status}</p>
        {percentage === 100 && (
          <p className="mt-3 text-sm text-teal-900">
            Congratulations! You completed all learning modules for this skill.
          </p>
        )}
      </Card>

      <h2 className="mt-8 mb-4 text-xl font-bold text-stone-900">Learning Modules</h2>
      <div className="space-y-4">
        {skill.modules.map((mod, index) => {
          const done = !!completedMap[mod.id];
          return (
            <Card key={mod.id} className="rounded-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
                Module {index + 1}
              </p>
              <h3 className="mt-1 text-lg font-bold text-stone-900">{mod.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{mod.description}</p>
              <p className={`mt-3 text-sm font-semibold ${done ? 'text-teal-800' : 'text-stone-500'}`}>
                {done ? '✓ Completed' : '○ Not Completed'}
              </p>
              <div className="mt-4">
                <Link to={`/student/skills/${skill.id}/module/${mod.id}`}>
                  <Button>{done ? 'Review Module' : 'Start Module'}</Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/student/skills">
          <Button variant="outline">Back to Skills</Button>
        </Link>
        {percentage === 100 && (
          <Link to={`/student/skills/${skill.id}/quiz`}>
            <Button>TAKE QUIZ</Button>
          </Link>
        )}
        <Link to="/student/progress">
          <Button variant="ghost">View Progress</Button>
        </Link>
      </div>
    </div>
  );
}
