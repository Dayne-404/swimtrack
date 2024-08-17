const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Students name is required"]
    },
    passed: {
        type: Boolean,
        required: [true, "Passed or Failed status is required"]
    }
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;