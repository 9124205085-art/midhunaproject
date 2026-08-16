const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');

/**
 * Phase 3 — Student dashboard overview
 * GET /api/students/dashboard
 */
const getDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select('-password');
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Unable to load your profile. Please try again.',
      });
    }

    // Real enrollment check only — never invent class data (Phase 7)
    let hasEnrollment = false;
    try {
      const enrollment = await Enrollment.findOne({ student: student._id }).select('_id');
      hasEnrollment = !!enrollment;
    } catch {
      hasEnrollment = false;
    }

    const assessmentCompleted = !!student.assessmentCompleted;

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
        assessmentCompleted,
      },
      assessmentStatus: assessmentCompleted ? 'Completed' : 'Not Completed',
      recommendationStatus: assessmentCompleted ? 'Available' : 'Complete assessment first',
      classStatus: hasEnrollment ? 'Registered' : 'Not Registered',
      // Progress calculation belongs to Phase 8
      progressStatus: 'Not Started',
    });
  } catch (error) {
    console.error('Dashboard error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load your profile. Please try again.',
    });
  }
};

/**
 * Phase 3 — Student profile
 * GET /api/students/profile
 * Uses JWT userId only — never accept profile :id from URL
 */
const getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select('-password');
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Unable to load your profile. Please try again.',
      });
    }

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
        guardianContact: student.guardianContact,
        username: student.username,
        assessmentCompleted: student.assessmentCompleted,
        role: student.role,
      },
    });
  } catch (error) {
    console.error('Profile error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load your profile. Please try again.',
    });
  }
};

/** Reserved for later phases — kept so existing imports do not break */
const getProgress = async (req, res) => {
  return res.status(501).json({
    success: false,
    message: 'Progress module will be available in a later phase.',
  });
};

const updateLearningProgress = async (req, res) => {
  return res.status(501).json({
    success: false,
    message: 'Learning progress will be available in a later phase.',
  });
};

module.exports = { getDashboard, getProfile, getProgress, updateLearningProgress };
