const express = require('express');
const {
  getClasses,
  getClassById,
  registerForClass,
  getMyClasses,
  createClass,
  updateClass,
  deleteClass,
} = require('../controllers/classController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', protect, getClasses);
router.get('/my', protect, requireRole('student'), getMyClasses);
router.get('/:classId', protect, getClassById);
router.post('/:classId/register', protect, requireRole('student'), registerForClass);
router.post('/', protect, requireRole('volunteer'), createClass);
router.put('/:classId', protect, requireRole('volunteer'), updateClass);
router.delete('/:classId', protect, requireRole('volunteer'), deleteClass);

module.exports = router;
