const Worksheet = require('../models/Worksheet.model.js');

const getWorksheets = async (req, res) => {
	const { id, instructorId } = req.params;
	const { limit = 10, skip = 0, ...filters } = req.query;

	try {
		let query = {};

		if(instructorId) query.instructor = instructorId;
		else if (filters.instructor) query.instructor = filters.instructor;

		if (filters.level)
			query.level = {
				$in: Array.isArray(filters.level)
					? filters.level
					: [filters.level],
			};
		if (filters.year)
			query.year = {
				$in: Array.isArray(filters.year)
					? filters.year
					: [filters.year],
			};
		if (filters.session)
			query.session = {
				$in: Array.isArray(filters.session)
					? filters.session
					: [filters.session],
			};
		if (filters.day)
			query.day = {
				$in: Array.isArray(filters.day) ? filters.day : [filters.day],
			};
		if (filters.time)
			query.time = {
				$in: Array.isArray(filters.time)
					? filters.time
					: [filters.time],
			};
		if (filters.location)
			query.location = {
				$in: Array.isArray(filters.location)
					? filters.location
					: [filters.location],
			};

		let sortQuery = {};
		const sort = req.query.sort || [];
		const sortArray = Array.isArray(sort) ? sort : [sort];

		sortArray.forEach((field) => {
			const order = field.startsWith('-') ? -1 : 1;
			const key = field.replace(/^-/, '');
			sortQuery[key] = order;
		});

		const worksheets = await Worksheet.find(query)
			.sort(sortQuery)
			.skip(parseInt(skip))
			.limit(parseInt(limit))
			.populate('instructor', '_id name');

		const totalCount = await Worksheet.countDocuments(query);
		res.status(200).json({ worksheets, totalCount });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getWorksheetById = async (req, res) => {
	try {
		const { id } = req.params;
		const worksheet = await Worksheet.findById(id).populate(
			'instructor',
			'_id name'
		);
		res.status(200).json(worksheet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getWorksheetByInstructor = async (req, res) => {
	try {
		const { instructorId } = req.params;
		const worksheets = await Worksheet.find({ instructor: instructorId });
		res.status(200).json(worksheets);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createWorksheet = async (req, res) => {
	try {
		const worksheet = await Worksheet.create(req.body);
		res.status(200).json(worksheet);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const updateWorksheetById = async (req, res) => {
	try {
		const { id } = req.params;
		const worksheet = await Worksheet.findByIdAndUpdate(id, req.body);

		if (!worksheet) {
			return res.status(404).json({ message: 'Worksheet not found' });
		}

		const updatedWorksheet = await Worksheet.findById(id);
		res.status(200).json(updatedWorksheet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteWorksheetById = async (req, res) => {
	try {
		const { id } = req.params;

		const worksheet = await Worksheet.findByIdAndDelete(id);

		if (!worksheet) {
			return res.status(404).json({ message: 'Worksheet not found' });
		}

		res.status(200).json({ messaage: 'Worksheet deleted sucessfully' });
	} catch (error) {
		res.status(500).json({ messaage: error.message });
	}
};

module.exports = {
	getWorksheets,
	getWorksheetById,
	getWorksheetByInstructor,
	createWorksheet,
	updateWorksheetById,
	deleteWorksheetById,
};
