import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { getModuleById, getModuleIndex, getSkillById } from '../../data/skills';
import { completeModule, getSkillProgress } from '../../services/progressService';

/**
 * Phase 6 + Phase 8 — Module content with completion
 */
export default function ModuleDetails() {
  const { skillId, moduleId } = useParams();
  const skill = getSkillById(skillId);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const module = skill ? getModuleById(skill, moduleId) : null;
  const index = skill ? getModuleIndex(skill, moduleId) : -1;

  useEffect(() => {
    if (!skill || !module) {
      setLoading(false);
      return;
    }
    let active = true;
    getSkillProgress(skill.id)
      .then((res) => {
        if (!active) return;
        setProgress(res.data);
        const item = (res.data.modules || []).find((m) => m.moduleId === module.id);
        setCompleted(!!item?.completed);
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
  }, [skillId, moduleId]);

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

  if (!module || index < 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <Card className="rounded-xl text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-3">Learning module not found.</h1>
          <Link to={`/student/skills/${skill.id}`}>
            <Button>Back to Modules</Button>
          </Link>
        </Card>
      </div>
    );
  }

  if (loading) return <Loading text="Loading your progress..." />;

  const prev = index > 0 ? skill.modules[index - 1] : null;
  const next = index < skill.modules.length - 1 ? skill.modules[index + 1] : null;
  const allDone = progress?.percentage === 100;

  const onComplete = async () => {
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      const res = await completeModule(skill.id, module.id);
      setCompleted(true);
      setProgress(res.data.detail);
      setSuccess(
        res.data.alreadyCompleted
          ? 'Module already completed.'
          : res.data.message || 'Module completed successfully!'
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update progress. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 overflow-x-hidden">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">{skill.name}</p>
      <p className="mt-1 text-sm text-stone-500">Module {index + 1}</p>
      <h1 className="mt-1 text-3xl font-bold text-stone-900">{module.title}</h1>
      <p className={`mt-2 text-sm font-semibold ${completed ? 'text-teal-800' : 'text-stone-500'}`}>
        {completed ? '✓ Completed' : '○ Not Completed'}
      </p>

      <ErrorMessage message={error} />
      {success && (
        <div className="mb-4 border border-teal-300 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          {success}
        </div>
      )}

      <Card className="mt-6 rounded-xl">
        <div className="whitespace-pre-line text-sm leading-relaxed text-stone-700">
          {module.content}
        </div>
        <h3 className="mt-6 font-semibold text-stone-900">Key Points</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-700">
          {module.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Card>

      <div className="mt-6">
        <Button onClick={onComplete} disabled={completed || submitting}>
          {submitting ? 'Updating progress...' : completed ? 'Completed' : 'Mark as Completed'}
        </Button>
      </div>

      {completed && allDone && (
        <p className="mt-4 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          Congratulations! You completed all learning modules for this skill.
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {prev ? (
          <Link to={`/student/skills/${skill.id}/module/${prev.id}`}>
            <Button variant="outline">Previous Module</Button>
          </Link>
        ) : (
          <Button variant="outline" disabled>
            Previous Module
          </Button>
        )}

        <Link to={`/student/skills/${skill.id}`}>
          <Button variant="ghost">Back to Modules</Button>
        </Link>

        {next ? (
          <Link to={`/student/skills/${skill.id}/module/${next.id}`}>
            <Button variant={completed ? 'primary' : 'outline'}>Next Module</Button>
          </Link>
        ) : completed ? (
          <Link to="/student/progress">
            <Button>View Progress</Button>
          </Link>
        ) : (
          <Button disabled>Next Module</Button>
        )}
      </div>
    </div>
  );
}
