const Instructor = require('../models/Instructor.model')

const createInstructor = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		const newInstructor = await Instructor.create({
			name: name,
			email: email,
            password: password,
		});

		res.status(200).json(newInstructor);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
    createInstructor
}