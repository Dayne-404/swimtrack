const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const worksheetRoute = require('./routes/worksheet.route.js');
const groupRoute = require('./routes/group.route.js')
const instructorRoute = require('./routes/instructor.route.js')

const uri =
	'mongodb+srv://daynedell:JM3fX8dwa3CQ7DBH@cluster0.slzbw.mongodb.net/Worksheets?retryWrites=true&w=majority&appName=Cluster0';
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/instructors', instructorRoute);
app.use('/api/worksheets', worksheetRoute);
app.use('/api/groups', groupRoute);

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
