const express = require('express');
const { registerStudent, loginStudent } = require('../controllers/authController');
const { getDashboard, getProfile } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Phase 2 — Authentication
router.post('/register', registerStudent);
router.post('/login', loginStudent);

// Phase 3 — Dashboard & Profile (JWT required, student role only)
router.get('/dashboard', protect, requireRole('student'), getDashboard);
router.get('/profile', protect, requireRole('student'), getProfile);

module.exports = router;
