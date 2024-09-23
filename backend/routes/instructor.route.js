const express = require('express');
const { createInstructor, getProtectedInstructor, getInstructorProfile } = require('../controllers/instructor.controller.js');

const router = express.Router();

router.post('/', createInstructor);
router.get('/', getProtectedInstructor);
router.get('/profile/:id', getInstructorProfile)

module.exports = router;