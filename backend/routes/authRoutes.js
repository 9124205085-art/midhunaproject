const express = require('express');
const { loginVolunteer, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Session restore for AuthContext (Phase 2)
router.get('/me', protect, getMe);

// Reserved for later volunteer phase
router.post('/volunteer/login', loginVolunteer);

module.exports = router;
