const express = require('express');
const { getQuiz, submitQuiz, getQuizResult } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/result/:resultId', protect, getQuizResult);
router.get('/:courseId', protect, requireRole('student'), getQuiz);
router.post('/:courseId/submit', protect, requireRole('student'), submitQuiz);

module.exports = router;
