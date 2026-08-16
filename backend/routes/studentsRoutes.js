const express = require('express');
const { registerStudent, loginStudent } = require('../controllers/authController');

const router = express.Router();

// Phase 2 — Student Authentication
router.post('/register', registerStudent);
router.post('/login', loginStudent);

module.exports = router;
