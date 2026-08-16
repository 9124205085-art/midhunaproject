const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');
const QuizResult = require('../models/QuizResult');

const getDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select('-password');
    const enrollment = await Enrollment.findOne({ student: student._id }).populate('classSession');
    const latestQuiz = await QuizResult.findOne({ student: student._id }).sort({ createdAt: -1 });

    let progressPercent = 0;
    if (student.assessmentCompleted) progressPercent += 25;
    if (enrollment) progressPercent += 25;
    if (student.learningProgress?.completedModules?.length) {
      progressPercent += Math.min(25, student.learningProgress.completedModules.length * 6);
    }
    if (latestQuiz) progressPercent += 25;
    progressPercent = Math.min(100, progressPercent);

    res.json({
      student: {
        name: student.name,
        className: student.className,
        location: student.location,
        school: student.school,
        language: student.language,
        guardianContact: student.guardianContact,
        assessmentCompleted: student.assessmentCompleted,
        recommendedSkill: student.recommendedSkill,
      },
      assessmentStatus: student.assessmentCompleted ? 'Completed' : 'Not Completed',
      recommendationStatus: student.assessmentCompleted ? 'Available' : 'Complete Assessment',
      classStatus: enrollment ? 'Registered' : 'Not Registered',
      progressPercent,
      enrollment,
      latestQuiz,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select('-password');
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProgress = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select('-password');
    const enrollment = await Enrollment.findOne({ student: student._id })
      .populate('classSession')
      .populate('course');
    const latestQuiz = await QuizResult.findOne({ student: student._id })
      .populate('course')
      .sort({ createdAt: -1 });

    let overall = 0;
    if (student.assessmentCompleted) overall += 25;
    if (enrollment) overall += 25;
    const modulesDone = student.learningProgress?.completedModules?.length || 0;
    if (modulesDone > 0) overall += Math.min(25, modulesDone * 6);
    if (latestQuiz) overall += 25;
    overall = Math.min(100, overall);

    res.json({
      name: student.name,
      assessmentCompleted: student.assessmentCompleted,
      recommendedSkill: student.recommendedSkill || 'Not available',
      classRegistered: !!enrollment,
      enrollment,
      learningProgress: student.learningProgress,
      latestQuiz,
      overallProgress: overall,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLearningProgress = async (req, res) => {
  try {
    const { courseId, currentModule, completedModule } = req.body;
    const student = await Student.findById(req.user._id);

    if (!student.learningProgress) {
      student.learningProgress = { courseId, currentModule: 0, completedModules: [] };
    }

    student.learningProgress.courseId = courseId || student.learningProgress.courseId;
    if (typeof currentModule === 'number') {
      student.learningProgress.currentModule = currentModule;
    }
    if (typeof completedModule === 'number') {
      if (!student.learningProgress.completedModules.includes(completedModule)) {
        student.learningProgress.completedModules.push(completedModule);
      }
    }

    await student.save();
    res.json({ message: 'Progress updated', learningProgress: student.learningProgress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, getProfile, getProgress, updateLearningProgress };
