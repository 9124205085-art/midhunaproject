const Student = require('../models/Student');
const ClassSession = require('../models/Class');
const Course = require('../models/Course');

const getDashboard = async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    const classCount = await ClassSession.countDocuments();
    const students = await Student.find()
      .select('fullName classGrade location assessmentCompleted recommendedSkill')
      .sort({ createdAt: -1 });
    const classes = await ClassSession.find().populate('course', 'name').sort({ date: 1 });
    const courses = await Course.find().select('name');

    res.json({
      volunteer: req.user,
      registeredStudents: studentCount,
      availableClasses: classCount,
      students,
      classes,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select('fullName classGrade location assessmentCompleted recommendedSkill school age')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard, getStudents };
