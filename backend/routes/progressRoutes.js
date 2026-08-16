const express = require('express');
const {
  getAllProgress,
  getSkillProgress,
  completeModule,
} = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect, requireRole('student'));

router.get('/', getAllProgress);
router.get('/:skillId', getSkillProgress);
router.post('/:skillId/module/:moduleId/complete', completeModule);

module.exports = router;
