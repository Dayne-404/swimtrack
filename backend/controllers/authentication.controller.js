const Instructor = require('../models/Instructor.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		let instructor = await Instructor.findOne({ email });
		if (!instructor) {
			return res.status(404).json({ message: 'Cannot find user' });
		}

		const isMatch = await bcrypt.compare(password, instructor.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials ' });
		}

		const token = jwt.sign({ id: instructor._id, type: instructor.type }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		res.status(200).json({ token: token });
	} catch (error) {
        console.error(error);
		res.status(500).send('Server error');
	}
};

module.exports = {
    login
}
