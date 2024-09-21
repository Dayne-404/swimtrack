const express = require('express');
const { login } = require('../controllers/authentication.controller.js')

const router = express.Router();

router.post('/', login);

module.exports = router;