import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import worksheetRoute from './routes/worksheet.route.js';
import groupRoute from './routes/group.route.js';
import instructorRoute from './routes/instructor.route.js';
import authenticationRoute from './routes/authentication.route.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/authenticate', authenticationRoute);
app.use('/api/instructors', authenticateToken, instructorRoute);
app.use('/api/worksheets', authenticateToken, worksheetRoute);
app.use('/api/groups', authenticateToken, groupRoute);

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if(!token) return res.sendStatus(401);

	jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
		if(error) return res.sendStatus(403);
		req.user = {_id: decoded.id, type: decoded.type};
		next();
	})
}

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Connected to the database!');
		app.listen(3000, () => {
			console.log('Server is running on port 3000');
		});
	})
	.catch(() => {
		console.log('Failed to connect to database');
	});
