const ClassSession = require('../models/Class');
const {
  isWeekendOrHolidaySession,
  formatDisplayDate,
} = require('../utils/weekendValidation');

const toPublicClass = (doc, studentId = null) => {
  const obj = doc.toObject({ virtuals: true });
  const registeredCount = obj.registeredStudents?.length || 0;
  const availableSeats = Math.max(0, obj.capacity - registeredCount);
  const isRegistered = studentId
    ? (obj.registeredStudents || []).some((id) => String(id) === String(studentId))
    : false;

  return {
    id: obj._id,
    title: obj.title,
    skill: obj.skill,
    description: obj.description,
    date: obj.date,
    displayDate: formatDisplayDate(obj.date),
    day: obj.day,
    startTime: obj.startTime,
    endTime: obj.endTime,
    location: obj.location,
    facilitator: obj.facilitator,
    capacity: obj.capacity,
    registeredCount,
    availableSeats,
    isRegistered,
    status: isRegistered ? 'Registered' : availableSeats > 0 ? 'Open' : 'Full',
  };
};

/**
 * GET /api/classes
 * Only weekend / holiday sessions
 */
const getClasses = async (req, res) => {
  try {
    const all = await ClassSession.find().sort({ date: 1 });
    const weekendOnly = all.filter((c) => isWeekendOrHolidaySession(c.day, c.date));
    const studentId = req.user?._id;

    return res.json({
      success: true,
      classes: weekendOnly.map((c) => toPublicClass(c, studentId)),
    });
  } catch (error) {
    console.error('Get classes error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load classes. Please try again.',
    });
  }
};

/**
 * GET /api/classes/my-registrations
 */
const getMyRegistrations = async (req, res) => {
  try {
    const classes = await ClassSession.find({
      registeredStudents: req.user._id,
    }).sort({ date: 1 });

    const weekendOnly = classes.filter((c) => isWeekendOrHolidaySession(c.day, c.date));

    return res.json({
      success: true,
      classes: weekendOnly.map((c) => toPublicClass(c, req.user._id)),
    });
  } catch (error) {
    console.error('My registrations error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load your registrations. Please try again.',
    });
  }
};

/**
 * GET /api/classes/:classId
 */
const getClassById = async (req, res) => {
  try {
    const classSession = await ClassSession.findById(req.params.classId);
    if (!classSession) {
      return res.status(404).json({
        success: false,
        message: 'Class not found.',
      });
    }

    if (!isWeekendOrHolidaySession(classSession.day, classSession.date)) {
      return res.status(400).json({
        success: false,
        message: 'This session is not a valid weekend or holiday class.',
      });
    }

    return res.json({
      success: true,
      class: toPublicClass(classSession, req.user._id),
    });
  } catch (error) {
    console.error('Get class error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to load class details. Please try again.',
    });
  }
};

/**
 * POST /api/classes/:classId/register
 * Student ID from JWT only
 */
const registerForClass = async (req, res) => {
  try {
    const classSession = await ClassSession.findById(req.params.classId);
    if (!classSession) {
      return res.status(404).json({
        success: false,
        message: 'Class not found.',
      });
    }

    if (!isWeekendOrHolidaySession(classSession.day, classSession.date)) {
      return res.status(400).json({
        success: false,
        message: 'This session is not a valid weekend or holiday class.',
      });
    }

    const studentId = req.user._id;
    const already = classSession.registeredStudents.some(
      (id) => String(id) === String(studentId)
    );
    if (already) {
      return res.status(400).json({
        success: false,
        message: 'Already registered for this class.',
      });
    }

    if (classSession.registeredStudents.length >= classSession.capacity) {
      return res.status(400).json({
        success: false,
        message: 'This class is full.',
      });
    }

    classSession.registeredStudents.push(studentId);
    await classSession.save();

    return res.status(201).json({
      success: true,
      message: 'Successfully registered for the class.',
      class: toPublicClass(classSession, studentId),
    });
  } catch (error) {
    console.error('Register class error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to register for this class. Please try again.',
    });
  }
};

module.exports = {
  getClasses,
  getClassById,
  registerForClass,
  getMyRegistrations,
  toPublicClass,
};
