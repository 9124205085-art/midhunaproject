import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { skills } from '../../data/skills';

/**
 * Phase 6 — Explore Skills list
 */
export default function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 overflow-x-hidden">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 md:text-4xl">Explore Skills</h1>
        <p className="mt-2 text-stone-600">Choose a skill you would like to learn.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <Card key={skill.id} className="rounded-xl flex flex-col">
            <h2 className="text-xl font-bold text-stone-900">{skill.name}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">
              {skill.shortDescription}
            </p>
            <div className="mt-5">
              <Link to={`/student/skills/${skill.id}`}>
                <Button>Start Learning</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Link to="/student/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
