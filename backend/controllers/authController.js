const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Volunteer = require('../models/Volunteer');

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      age,
      classGrade,
      school,
      location,
      preferredLanguage,
      parentContact,
      username,
      password,
      confirmPassword,
    } = req.body;

    if (
      !fullName ||
      !age ||
      !classGrade ||
      !school ||
      !location ||
      !preferredLanguage ||
      !parentContact ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 5 || ageNum > 25) {
      return res.status(400).json({ message: 'Please enter a valid age (5-25).' });
    }

    if (username.trim().length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const exists = await Student.findOne({ username: username.toLowerCase().trim() });
    if (exists) {
      return res.status(400).json({ message: 'Username already exists. Please choose another.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const student = await Student.create({
      fullName,
      age: ageNum,
      classGrade,
      school,
      location,
      preferredLanguage,
      parentContact,
      username: username.toLowerCase().trim(),
      password: hashed,
    });

    res.status(201).json({
      message: 'Registration successful. Please login.',
      studentId: student._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Registration failed.' });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const student = await Student.findOne({ username: username.toLowerCase().trim() });
    if (!student) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    res.json({
      token: generateToken(student._id, 'student'),
      role: 'student',
      user: {
        id: student._id,
        fullName: student.fullName,
        username: student.username,
        classGrade: student.classGrade,
        location: student.location,
        assessmentCompleted: student.assessmentCompleted,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed.' });
  }
};

const loginVolunteer = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const volunteer = await Volunteer.findOne({ username: username.toLowerCase().trim() });
    if (!volunteer) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const match = await bcrypt.compare(password, volunteer.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    res.json({
      token: generateToken(volunteer._id, 'volunteer'),
      role: 'volunteer',
      user: {
        id: volunteer._id,
        fullName: volunteer.fullName,
        username: volunteer.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed.' });
  }
};

const getMe = async (req, res) => {
  res.json({ user: req.user, role: req.role });
};

module.exports = { registerStudent, loginStudent, loginVolunteer, getMe };
