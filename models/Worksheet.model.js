const mongoose = require('mongoose');
const Student = require('./Student.model'); // Correct path to Student model

const WorksheetSchema = mongoose.Schema(
	{
		instructor: {
			type: String,
			required: [true, 'Instructor name required'],
		},
		level: {
			type: Number,
			required: [true, 'Level is required'],
			min: [1, 'Level must be at least 1'],
			max: [6, 'Level must be at most 6'],
		},
		session: {
			type: String,
			enum: ['Winter', 'Spring', 'Summer', 'Fall'],
			required: [true, 'Session is required'],
		},
		day: {
			type: String,
			enum: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri'],
			required: [true, 'Day is required'],
		},
		time: {
			type: String,
			required: [true, 'Lesson time is required'],
			match: [
				/^([01]\d|2[0-3]):([0-5]\d)$/,
				'Please enter a valid time in HH:mm format',
			], // Regex for HH:mm format
		},
		location: {
			type: String,
			enum: ['Rec', 'Dunbarton'],
			required: [true, 'Location is required'],
		},
		students: {
			type: [Student.schema], // Reference to Student schema
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

const Worksheet = mongoose.model('Worksheet', WorksheetSchema);
module.exports = Worksheet;
