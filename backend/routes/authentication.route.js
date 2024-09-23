const express = require('express');
const { login, validateToken } = require('../controllers/authentication.controller.js')

const router = express.Router();

router.post('/login', login);
router.post('/checkToken', validateToken);

module.exports = router;