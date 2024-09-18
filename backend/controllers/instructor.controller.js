const Instructor = require('../models/Instructor.model');

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

const getInstructor = async (req, res) => {
	const { limit = 9, search = '' } = req.query;

	let searchQuery = {};

	try {
		if (search) {
			searchQuery = {
				$or: [{ name: { $regex: search, $options: 'i' } }],
			};
		}

		const instructor = await Instructor.find(searchQuery).limit(
			parseInt(limit)
		);

		res.status(200).json(instructor);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getInstructor,
	createInstructor,
};
