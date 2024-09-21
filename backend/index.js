const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const worksheetRoute = require('./routes/worksheet.route.js');
const groupRoute = require('./routes/group.route.js')
const instructorRoute = require('./routes/instructor.route.js')
const loginRoute = require('./routes/login.route.js')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const uri =
	'mongodb+srv://daynedell:JM3fX8dwa3CQ7DBH@cluster0.slzbw.mongodb.net/Worksheets?retryWrites=true&w=majority&appName=Cluster0';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/login', loginRoute);
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
	.connect(uri)
	.then(() => {
		console.log('Connected to the database!');
		app.listen(3000, () => {
			console.log('Server is running on port 3000');
		});
	})
	.catch(() => {
		console.log('Failed to connect to database');
	});
