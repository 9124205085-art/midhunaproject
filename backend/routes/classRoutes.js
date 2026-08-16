const express = require('express');
const {
  getClasses,
  getClassById,
  registerForClass,
  getMyRegistrations,
} = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

// Phase 7 — Weekend / Holiday Community Learning (student)
router.get('/', protect, requireRole('student'), getClasses);
router.get('/my-registrations', protect, requireRole('student'), getMyRegistrations);
router.get('/:classId', protect, requireRole('student'), getClassById);
router.post('/:classId/register', protect, requireRole('student'), registerForClass);

module.exports = router;
