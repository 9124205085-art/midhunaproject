const Course = require('../models/Course');
const QuizResult = require('../models/QuizResult');

const getPerformanceLabel = (percentage) => {
  if (percentage >= 80) return 'Excellent';
  if (percentage >= 60) return 'Good';
  if (percentage >= 40) return 'Needs Improvement';
  return 'Needs Practice';
};

const getQuiz = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    const questions = course.quiz.map((q, index) => ({
      index,
      question: q.question,
      options: q.options,
    }));

    res.json({
      courseId: course._id,
      courseName: course.name,
      questions,
      total: questions.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    if (!answers || !Array.isArray(answers) || answers.length !== course.quiz.length) {
      return res.status(400).json({ message: 'Please answer all quiz questions.' });
    }

    let score = 0;
    course.quiz.forEach((q, i) => {
      if (Number(answers[i]) === q.correctAnswer) score += 1;
    });

    const total = course.quiz.length;
    const percentage = Math.round((score / total) * 100);
    const performance = getPerformanceLabel(percentage);

    const result = await QuizResult.create({
      student: req.user._id,
      course: course._id,
      score,
      total,
      percentage,
      performance,
      answers,
    });

    res.status(201).json({
      resultId: result._id,
      score,
      total,
      percentage,
      performance,
      courseName: course.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuizResult = async (req, res) => {
  try {
    const result = await QuizResult.findById(req.params.resultId).populate('course', 'name');
    if (!result) {
      return res.status(404).json({ message: 'Quiz result not found.' });
    }
    if (String(result.student) !== String(req.user._id) && req.role !== 'volunteer') {
      return res.status(403).json({ message: 'Access denied.' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuiz, submitQuiz, getQuizResult };
