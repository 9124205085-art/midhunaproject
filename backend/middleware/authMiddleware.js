const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Volunteer = require('../models/Volunteer');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized. Please login.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'volunteer') {
      req.user = await Volunteer.findById(decoded.id).select('-password');
      req.role = 'volunteer';
    } else {
      req.user = await Student.findById(decoded.id).select('-password');
      req.role = 'student';
    }

    if (!req.user) {
      return res.status(401).json({ message: 'User not found.' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = { protect };
