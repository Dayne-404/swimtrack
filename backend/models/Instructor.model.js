const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    type: {
        type: String,
        enum: ['admin', 'supervisor', 'instructor'],
        default: 'instructor',
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    }

}, {timestamps: true} );

const Group = mongoose.model('Instructor', instructorSchema);
module.exports = Group;