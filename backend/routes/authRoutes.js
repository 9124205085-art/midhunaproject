const express = require('express');
const { registerStudent, loginStudent, loginVolunteer, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.post('/volunteer/login', loginVolunteer);
router.get('/me', protect, getMe);

module.exports = router;
