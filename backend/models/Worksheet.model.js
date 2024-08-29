const mongoose = require('mongoose');
const Student = require('./Student.model'); // Correct path to Student model

const WorksheetSchema = mongoose.Schema(
	{
		instructor: {
			type: String,
			required: [true, 'Instructor name required'],
		},
		level: {
			type: String,
			enum: [
				'parentAndTot1',
				'parentAndTot2',
				'parentAndTot3',
				'preschool1',
				'preschool2',
				'preschool3',
				'preschool4',
				'preschool5',
				'preschool6',
				'swimmer1',
				'swimmer2',
				'swimmer3',
				'swimmer4',
				'swimmer5',
				'swimmer6',
				'adult1',
				'adult2',
				'adult3',
			],
			required: [true, 'Level is required'],
		},
		session: {
			type: String,
			enum: ['winter', 'spring', 'summer', 'fall'],
			required: [true, 'Session is required'],
		},
		day: {
			type: String,
			enum: ['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun', 'weekly'],
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
			enum: ['rec', 'dun'],
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
