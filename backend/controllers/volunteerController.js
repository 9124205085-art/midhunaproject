const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Volunteer = require('../models/Volunteer');
const ClassSession = require('../models/Class');
const Progress = require('../models/Progress');
const { generateRecommendations } = require('../services/recommendationService');
const { getSkill } = require('../data/skillsCatalog');
const { getLatestQuizForStudent } = require('./quizController');

const generateToken = (userId, role) =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

/**
 * POST /api/volunteers/login
 */
const volunteerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }

    const volunteer = await Volunteer.findOne({
      username: username.toLowerCase().trim(),
    });
    if (!volunteer) {
      return res.status(401).json({
        success: false,
        message: 'Invalid volunteer username or password.',
      });
    }

    const match = await bcrypt.compare(password, volunteer.password);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: 'Invalid volunteer username or password.',
      });
    }

    return res.json({
      success: true,
      token: generateToken(volunteer._id, 'volunteer'),
      role: 'volunteer',
      user: {
        id: volunteer._id,
        name: volunteer.name,
        username: volunteer.username,
        role: 'volunteer',
      },
    });
  } catch (error) {
    console.error('Volunteer login error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
    });
  }
};

const getRecommendedSkill = (student) => {
  if (student.recommendedSkill) return student.recommendedSkill;
  if (student.assessmentCompleted && student.assessment?.answers?.length) {
    try {
      const result = generateRecommendations(student.assessment.answers);
      return result.topRecommendation?.skill || 'Not available';
    } catch {
      return 'Not available';
    }
  }
  return 'Not available';
};

const getClassRegistrationStatus = async (studentId) => {
  const registered = await ClassSession.findOne({
    registeredStudents: studentId,
  }).select('title skill');
  return {
    status: registered ? 'Registered' : 'Not Registered',
    classTitle: registered?.title || null,
    classSkill: registered?.skill || null,
  };
};

/**
 * GET /api/volunteers/dashboard
 */
const getDashboardStats = async (req, res) => {
  try {
    const registeredStudents = await Student.countDocuments();
    const allClasses = await ClassSession.find().select('day');
    const availableClasses = allClasses.length;
    const weekendClasses = allClasses.filter(
      (c) => c.day === 'Saturday' || c.day === 'Sunday'
    ).length;
    const holidayClasses = allClasses.filter((c) => c.day === 'Holiday').length;

    return res.json({
      success: true,
      stats: {
        registeredStudents,
        availableClasses,
        weekendClasses,
        holidayClasses,
      },
      volunteer: {
        id: req.user._id,
        name: req.user.name,
        username: req.user.username,
      },
    });
  } catch (error) {
    console.error('Volunteer dashboard error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load dashboard. Please try again.',
    });
  }
};

/**
 * GET /api/volunteers/students
 */
const getStudents = async (req, res) => {
  try {
    const { className, location, assessmentStatus, search } = req.query;
    const filter = {};

    if (className) filter.className = new RegExp(`^${className}$`, 'i');
    if (location) filter.location = new RegExp(location, 'i');
    if (assessmentStatus === 'Completed') filter.assessmentCompleted = true;
    if (assessmentStatus === 'Not Completed') filter.assessmentCompleted = false;
    if (search) filter.name = new RegExp(search, 'i');

    const students = await Student.find(filter)
      .select('name className school location assessmentCompleted assessment recommendedSkill')
      .sort({ createdAt: -1 });

    const mapped = await Promise.all(
      students.map(async (s) => {
        const reg = await getClassRegistrationStatus(s._id);
        return {
          id: s._id,
          name: s.name,
          className: s.className,
          school: s.school,
          location: s.location,
          assessmentStatus: s.assessmentCompleted ? 'Completed' : 'Not Completed',
          recommendedSkill: getRecommendedSkill(s),
          classRegistrationStatus: reg.status,
          registeredClass: reg.classTitle,
        };
      })
    );

    return res.json({ success: true, students: mapped });
  } catch (error) {
    console.error('Volunteer get students error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load students. Please try again.',
    });
  }
};

/**
 * GET /api/volunteers/students/:id
 */
const getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select(
      '-password -guardianContact'
    );
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.',
      });
    }

    const reg = await getClassRegistrationStatus(student._id);
    const progressDocs = await Progress.find({ studentId: student._id });
    const progress = progressDocs.map((p) => {
      const skill = getSkill(p.skillId);
      const total = skill?.modules?.length || 0;
      const completed = p.completedModules?.length || 0;
      const percentage = total ? Math.round((completed / total) * 100) : 0;
      return {
        skillId: p.skillId,
        skillName: skill?.name || p.skillId,
        completedModules: completed,
        totalModules: total,
        percentage,
      };
    });

    const latestQuiz = await getLatestQuizForStudent(student._id);

    return res.json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        age: student.age,
        className: student.className,
        school: student.school,
        location: student.location,
        language: student.language,
        assessmentStatus: student.assessmentCompleted ? 'Completed' : 'Not Completed',
        recommendedSkill: getRecommendedSkill(student),
        classRegistrationStatus: reg.status,
        registeredClass: reg.classTitle,
        registeredClassSkill: reg.classSkill,
        progress,
        latestQuizScore: latestQuiz
          ? `${latestQuiz.percentage}% (${latestQuiz.score}/${latestQuiz.total}) — ${latestQuiz.courseName}`
          : 'Not available',
        latestQuiz,
      },
    });
  } catch (error) {
    console.error('Volunteer student details error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load student details. Please try again.',
    });
  }
};

module.exports = {
  volunteerLogin,
  getDashboardStats,
  getStudents,
  getStudentDetails,
};
