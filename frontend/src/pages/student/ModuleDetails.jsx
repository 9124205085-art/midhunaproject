import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { getModuleById, getModuleIndex, getSkillById } from '../../data/skills';

/**
 * Phase 6 — Module learning content
 * No progress tracking / quiz (later phases).
 */
export default function ModuleDetails() {
  const { skillId, moduleId } = useParams();
  const skill = getSkillById(skillId);

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

  const module = getModuleById(skill, moduleId);
  const index = getModuleIndex(skill, moduleId);

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

  const prev = index > 0 ? skill.modules[index - 1] : null;
  const next = index < skill.modules.length - 1 ? skill.modules[index + 1] : null;
  const isLast = !next;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 overflow-x-hidden">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">{skill.name}</p>
      <p className="mt-1 text-sm text-stone-500">Module {index + 1}</p>
      <h1 className="mt-1 text-3xl font-bold text-stone-900">{module.title}</h1>

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

      {isLast && (
        <p className="mt-4 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
          You have reached the end of this skill&apos;s basic modules.
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
            <Button>Next Module</Button>
          </Link>
        ) : (
          <Button disabled>Next Module</Button>
        )}
      </div>
    </div>
  );
}
