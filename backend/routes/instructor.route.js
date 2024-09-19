const express = require('express');
const { createInstructor, getInstructor } = require('../controllers/instructor.controller.js');

const router = express.Router();

router.post('/', createInstructor);
router.get('/', getInstructor);

module.exports = router;