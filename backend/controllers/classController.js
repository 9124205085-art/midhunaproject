const ClassSession = require('../models/Class');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const getClasses = async (req, res) => {
  try {
    const { skill, day, location } = req.query;
    const filter = {};
    if (skill) filter.skill = new RegExp(skill, 'i');
    if (day) filter.day = day;
    if (location) {
      filter.$or = [
        { location: new RegExp(location, 'i') },
        { communityCentre: new RegExp(location, 'i') },
      ];
    }

    const classes = await ClassSession.find(filter).populate('course', 'name level duration').sort({ date: 1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassById = async (req, res) => {
  try {
    const classSession = await ClassSession.findById(req.params.classId).populate('course');
    if (!classSession) {
      return res.status(404).json({ message: 'Class not found.' });
    }
    res.json(classSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerForClass = async (req, res) => {
  try {
    const classSession = await ClassSession.findById(req.params.classId);
    if (!classSession) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    const already = await Enrollment.findOne({
      student: req.user._id,
      classSession: classSession._id,
    });
    if (already) {
      return res.status(400).json({ message: 'You are already registered for this class.' });
    }

    if (classSession.availableSeats <= 0) {
      return res.status(400).json({ message: 'No seats available for this class.' });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      classSession: classSession._id,
      course: classSession.course,
    });

    classSession.availableSeats -= 1;
    await classSession.save();

    res.status(201).json({
      message: 'Successfully registered for this class.',
      enrollment,
      courseId: classSession.course,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You are already registered for this class.' });
    }
    res.status(500).json({ message: error.message });
  }
};

const getMyClasses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({
        path: 'classSession',
        populate: { path: 'course', select: 'name level duration' },
      })
      .populate('course');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createClass = async (req, res) => {
  try {
    const { courseId, date, day, time, communityCentre, location, volunteerName, availableSeats } = req.body;

    if (!courseId || !date || !day || !time || !communityCentre || !location || !volunteerName || availableSeats === undefined) {
      return res.status(400).json({ message: 'All class fields are required.' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    const seats = Number(availableSeats);
    const classSession = await ClassSession.create({
      course: courseId,
      skill: course.name,
      date,
      day,
      time,
      communityCentre,
      location,
      volunteerName,
      availableSeats: seats,
      totalSeats: seats,
    });

    res.status(201).json(classSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const classSession = await ClassSession.findById(req.params.classId);
    if (!classSession) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    const fields = ['date', 'day', 'time', 'communityCentre', 'location', 'volunteerName', 'availableSeats'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        classSession[field] = req.body[field];
      }
    });

    if (req.body.availableSeats !== undefined) {
      classSession.availableSeats = Number(req.body.availableSeats);
    }

    await classSession.save();
    res.json(classSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const classSession = await ClassSession.findById(req.params.classId);
    if (!classSession) {
      return res.status(404).json({ message: 'Class not found.' });
    }

    await Enrollment.deleteMany({ classSession: classSession._id });
    await classSession.deleteOne();
    res.json({ message: 'Class deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getClasses,
  getClassById,
  registerForClass,
  getMyClasses,
  createClass,
  updateClass,
  deleteClass,
};
