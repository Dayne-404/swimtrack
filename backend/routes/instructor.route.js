import express from 'express';
import {
	createInstructor,
	getProtectedInstructor,
	getInstructorProfile,
} from '../controllers/instructor.controller.js';

const router = express.Router();

router.post('/', createInstructor);
router.get('/', getProtectedInstructor);
router.get('/profile/:id', getInstructorProfile);

export default router;
