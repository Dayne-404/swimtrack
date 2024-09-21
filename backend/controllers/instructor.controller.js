const Instructor = require('../models/Instructor.model');
const bcrypt = require('bcrypt');

const createInstructor = async (req, res) => {
	const userType = req.user.type;
	const { name, email, password, type, active } = req.body;

	if (userType !== 'admin') return res.sendStatus(401);

	try {
		let instructor = await Instructor.findOne({ email });

		if (instructor) {
			return res
				.status(400)
				.json({ message: 'User already exists', type: 0 });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newInstructor = await Instructor.create({
			name: name,
			email: email,
			password: hashedPassword,
			type: type,
			active: active,
		});

		res.status(200).json(newInstructor);
	} catch (error) {
		console.error(error);
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

		const instructor = await Instructor.find(searchQuery)
			.limit(parseInt(limit))
			.select('name _id');

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
