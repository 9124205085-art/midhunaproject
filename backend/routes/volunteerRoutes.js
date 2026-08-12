const express = require('express');
const { getDashboard, getStudents } = require('../controllers/volunteerController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect, requireRole('volunteer'));
router.get('/dashboard', getDashboard);
router.get('/students', getStudents);

module.exports = router;
