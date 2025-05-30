import mongoose from 'mongoose';

const nonEmptyString = (value) => value.trim().length > 0;
const StudentSchema = mongoose.Schema({
	name: {
		type: String,
		validate: [nonEmptyString, 'Student name cannot be empty'],
		required: [true, 'Students name is required'],
	},
	skills: {
		type: [Boolean],
		required: false,
	},
	passed: {
		type: Boolean,
		required: [true, 'Passed or Failed status is required'],
	},
});

export default StudentSchema;