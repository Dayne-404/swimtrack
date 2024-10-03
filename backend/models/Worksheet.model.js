import mongoose from 'mongoose';
import Student from './Student.model.js';
const currentYear = new Date().getFullYear();

const WorksheetSchema = mongoose.Schema(
    {
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instructor',
            required: [true, 'Instructor name required'],
        },
        level: {
            type: Number,
            min: 0,
            max: 20,
            required: [true, 'Level is required'],
        },
        year: {
            type: Number,
            min: [2000, 'Year must be after 2000'],
            max: [currentYear, 'Year cannot be in the future'],
            required: [true, 'Year is required'],
        },
        session: {
            type: Number,
            min: 0,
            max: 3,
            required: [true, 'Session is required'],
        },
        day: {
            type: Number,
            min: 0,
            max: 7,
            required: [true, 'Day is required'],
        },
        time: {
            type: String,
            required: [true, 'Lesson time is required'],
            match: [
                /^([01]\d|2[0-3]):([0-5]\d)$/,
                'Please enter a valid time in HH:mm format',
            ],
        },
        location: {
            type: Number,
            min: 0,
            max: 1,
            required: [true, 'Location is required'],
        },
        students: {
            type: [Student.schema], 
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

WorksheetSchema.index({
    instructor: 'text',
    level: 1,
    year: 1,
    session: 1,
    day: 1,
    time: 'text',
    location: 1
});

const Worksheet = mongoose.model('Worksheet', WorksheetSchema);

export default Worksheet;
