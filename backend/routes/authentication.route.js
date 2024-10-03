import express from 'express';
import { login, validateToken } from '../controllers/authentication.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/checkToken', validateToken);

export default router;
