const Progress = require('../models/Progress');
const { getSkill, isValidSkillModule, skillsCatalog } = require('../data/skillsCatalog');
const { getQuizResultsByStudent } = require('./quizController');

const calcPercentage = (completed, total) => {
  if (!total) return 0;
  return Math.round((completed / total) * 100);
};

const buildSkillProgressResponse = (skill, progressDoc, quiz = null) => {
  const completedSet = new Set(
    (progressDoc?.completedModules || []).map((m) => m.moduleId)
  );
  const totalModules = skill.modules.length;
  const completedModules = skill.modules.filter((m) => completedSet.has(m.id)).length;
  const percentage = calcPercentage(completedModules, totalModules);

  return {
    skillId: skill.id,
    skillName: skill.name,
    totalModules,
    completedModules,
    percentage,
    status: percentage === 100 ? 'Completed' : completedModules > 0 ? 'In Progress' : 'Not Started',
    modules: skill.modules.map((m) => ({
      moduleId: m.id,
      title: m.title,
      completed: completedSet.has(m.id),
    })),
    quiz: quiz
      ? {
          score: quiz.score,
          total: quiz.total,
          percentage: quiz.percentage,
          performance: quiz.performance,
          resultId: quiz.resultId,
        }
      : null,
  };
};

const matchQuizToSkill = (skill, quizResults) => {
  if (!quizResults?.length) return null;
  return (
    quizResults.find((q) => q.skillId === skill.id) ||
    quizResults.find(
      (q) => q.courseName && q.courseName.toLowerCase() === skill.name.toLowerCase()
    ) ||
    (skill.id === 'communication'
      ? quizResults.find((q) => q.skillId === 'communication-skills')
      : null)
  );
};

const getAllProgress = async (req, res) => {
  try {
    const records = await Progress.find({ studentId: req.user._id });
    const bySkill = Object.fromEntries(records.map((r) => [r.skillId, r]));
    const quizResults = await getQuizResultsByStudent(req.user._id);

    const items = skillsCatalog
      .map((skill) =>
        buildSkillProgressResponse(
          skill,
          bySkill[skill.id],
          matchQuizToSkill(skill, quizResults)
        )
      )
      .filter((item) => item.completedModules > 0 || item.quiz);

    return res.json({
      success: true,
      progress: items,
      latestQuizzes: quizResults,
    });
  } catch (error) {
    console.error('Get all progress error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load your progress.',
    });
  }
};

const getSkillProgress = async (req, res) => {
  try {
    const { skillId } = req.params;
    const skill = getSkill(skillId);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found.',
      });
    }

    const progressDoc = await Progress.findOne({
      studentId: req.user._id,
      skillId,
    });
    const quizResults = await getQuizResultsByStudent(req.user._id);
    const quiz = matchQuizToSkill(skill, quizResults);
    const result = buildSkillProgressResponse(skill, progressDoc, quiz);

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('Get skill progress error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load your progress.',
    });
  }
};

const completeModule = async (req, res) => {
  try {
    const { skillId, moduleId } = req.params;

    if (!isValidSkillModule(skillId, moduleId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid learning module.',
      });
    }

    const skill = getSkill(skillId);
    let progressDoc = await Progress.findOne({
      studentId: req.user._id,
      skillId,
    });

    if (!progressDoc) {
      progressDoc = await Progress.create({
        studentId: req.user._id,
        skillId,
        completedModules: [],
      });
    }

    const already = progressDoc.completedModules.some((m) => m.moduleId === moduleId);
    if (already) {
      const current = buildSkillProgressResponse(skill, progressDoc);
      return res.json({
        success: true,
        message: 'Module already completed.',
        alreadyCompleted: true,
        progress: {
          completedModules: current.completedModules,
          totalModules: current.totalModules,
          percentage: current.percentage,
          status: current.status,
        },
        detail: current,
      });
    }

    progressDoc.completedModules.push({
      moduleId,
      completedAt: new Date(),
    });
    await progressDoc.save();

    const updated = buildSkillProgressResponse(skill, progressDoc);

    return res.json({
      success: true,
      message: 'Module completed successfully.',
      alreadyCompleted: false,
      progress: {
        completedModules: updated.completedModules,
        totalModules: updated.totalModules,
        percentage: updated.percentage,
        status: updated.status,
      },
      detail: updated,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Unable to update progress. Please try again.',
      });
    }
    console.error('Complete module error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to update progress. Please try again.',
    });
  }
};

const getProgressSummaryForStudent = async (studentId) => {
  const records = await Progress.find({ studentId });
  if (!records.length) {
    return {
      hasProgress: false,
      progressStatus: 'Not Started',
      highlight: null,
    };
  }

  let best = null;
  for (const record of records) {
    const skill = getSkill(record.skillId);
    if (!skill) continue;
    const built = buildSkillProgressResponse(skill, record);
    if (!best || built.percentage > best.percentage) best = built;
  }

  return {
    hasProgress: true,
    progressStatus: best ? `${best.percentage}%` : 'In Progress',
    highlight: best,
  };
};

module.exports = {
  getAllProgress,
  getSkillProgress,
  completeModule,
  getProgressSummaryForStudent,
  buildSkillProgressResponse,
};
