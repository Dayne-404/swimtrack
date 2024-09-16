const express = require('express');
const { createInstructor } = require('../controllers/instructor.controller.js');

const router = express.Router();

router.post('/', createInstructor);

module.exports = router;