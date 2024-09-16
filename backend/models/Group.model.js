const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor',
        required: [true, 'Instructor name required'],
    },
    name: {
        type: String,
        required: true,
    },
    worksheets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Worksheet',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;