/**
 * Phase 8 — Skill/module catalog for progress validation
 * Must match frontend/src/data/skills.js IDs
 */
const skillsCatalog = [
  {
    id: 'abacus',
    name: 'Abacus',
    modules: [
      { id: 'abacus-1', title: 'Introduction to Abacus' },
      { id: 'abacus-2', title: 'Basic Number Representation' },
      { id: 'abacus-3', title: 'Basic Calculations' },
    ],
  },
  {
    id: 'coding',
    name: 'Coding',
    modules: [
      { id: 'coding-1', title: 'Introduction to Coding' },
      { id: 'coding-2', title: 'Variables and Basic Logic' },
      { id: 'coding-3', title: 'Simple Programming Problems' },
    ],
  },
  {
    id: 'communication',
    name: 'Communication Skills',
    modules: [
      { id: 'communication-1', title: 'Introduction to Communication' },
      { id: 'communication-2', title: 'Speaking and Vocabulary' },
      { id: 'communication-3', title: 'Everyday Communication' },
    ],
  },
  {
    id: 'logical-reasoning',
    name: 'Logical Reasoning',
    modules: [
      { id: 'logical-reasoning-1', title: 'Introduction to Logical Thinking' },
      { id: 'logical-reasoning-2', title: 'Patterns and Sequences' },
      { id: 'logical-reasoning-3', title: 'Problem Solving' },
    ],
  },
];

const getSkill = (skillId) => skillsCatalog.find((s) => s.id === skillId) || null;

const getModule = (skill, moduleId) =>
  skill?.modules?.find((m) => m.id === moduleId) || null;

const isValidSkillModule = (skillId, moduleId) => {
  const skill = getSkill(skillId);
  if (!skill) return false;
  return !!getModule(skill, moduleId);
};

module.exports = {
  skillsCatalog,
  getSkill,
  getModule,
  isValidSkillModule,
};
