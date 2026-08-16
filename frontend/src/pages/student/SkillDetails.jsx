import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { getSkillById } from '../../data/skills';

/**
 * Phase 6 — Skill detail + module list
 */
export default function SkillDetails() {
  const { skillId } = useParams();
  const skill = getSkillById(skillId);

  if (!skill) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <Card className="rounded-xl text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-3">Skill not found.</h1>
          <p className="text-sm text-stone-600 mb-6">
            The skill you opened is not available in this project.
          </p>
          <Link to="/student/skills">
            <Button>Back to Skills</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 overflow-x-hidden">
      <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Skill</p>
      <h1 className="mt-1 text-3xl font-bold uppercase text-stone-900">{skill.name}</h1>
      <p className="mt-3 text-stone-600 leading-relaxed">{skill.description}</p>

      <h2 className="mt-8 mb-4 text-xl font-bold text-stone-900">Learning Modules</h2>
      <div className="space-y-4">
        {skill.modules.map((mod, index) => (
          <Card key={mod.id} className="rounded-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-800">
              Module {index + 1}
            </p>
            <h3 className="mt-1 text-lg font-bold text-stone-900">{mod.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{mod.description}</p>
            <div className="mt-4">
              <Link to={`/student/skills/${skill.id}/module/${mod.id}`}>
                <Button>Start Module</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/student/skills">
          <Button variant="outline">Back to Skills</Button>
        </Link>
        <Link to="/student/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
