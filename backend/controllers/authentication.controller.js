import Instructor from '../models/Instructor.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
	const { email, password } = req.body;
	console.log('Email', email, 'Password', password);

	try {
		let instructor = await Instructor.findOne({ email });
		if (!instructor) {
			return res.status(404).json({ message: 'Cannot find user' });
		}

		const isMatch = await bcrypt.compare(password, instructor.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials ' });
		}

		const token = jwt.sign({ id: instructor._id, type: instructor.type, name: instructor.name }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		res.status(200).json({ token: token });
	} catch (error) {
        console.error(error);
		res.status(500).send('Server error');
	}
};

export const validateToken = async (req, res) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if(!token) return res.status(401).json({ message: 'No token provided' })

	try {
		jwt.verify(token, process.env.JWT_SECRET);
		console.log('Token is valid: ', token);
		return res.status(200).json({ valid: true });
	} catch (error) {
		console.error(error);
		console.log('Token is invalid: ', token);
		res.status(401).json({ message: 'Token is invalid or expired' });
	}
}
