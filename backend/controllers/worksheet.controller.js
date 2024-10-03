import buildFiltersQuery from '../helper/buildFiltersQuery.js';
import buildSortQuery from '../helper/buildSortQuery.js';
import Worksheet from '../models/Worksheet.model.js';

export const getWorksheets = async (req, res) => {
	const { specific = false, limit = 10, skip = 0, sort = [], ...filters } = req.query;

	try {
		const filterQuery = buildFiltersQuery(filters, req.user._id, specific);
		const sortQuery = buildSortQuery(sort);

		const worksheets = await Worksheet.find(filterQuery)
			.sort(sortQuery)
			.skip(parseInt(skip))
			.limit(parseInt(limit))
			.populate('instructor', '_id name');

		const totalCount = await Worksheet.countDocuments(filterQuery);

		res.status(200).json({ worksheets, totalCount });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getWorksheetById = async (req, res) => {
	try {
		const { id } = req.params;
		const worksheet = await Worksheet.findById(id).populate('instructor', '_id name');
		res.status(200).json(worksheet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getWorksheetByInstructor = async (req, res) => {
	try {
		const { instructorId } = req.params;
		const worksheets = await Worksheet.find({ instructor: instructorId });
		res.status(200).json(worksheets);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const createWorksheet = async (req, res) => {
	try {
		const worksheet = await Worksheet.create(req.body);
		res.status(200).json(worksheet);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

export const updateWorksheetById = async (req, res) => {
	const user = req.user;
	const { id } = req.params;

	try {
		const worksheet = await Worksheet.findById(id);

		if (!worksheet) {
			return res.status(404).json({ message: 'Worksheet not found' });
		}

		if (
			user._id !== String(worksheet.instructor) &&
			user.type !== 'admin' &&
			user.type !== 'supervisor'
		) {
			return res.status(403).json({
				message: 'You are not authorized to update this worksheet',
			});
		}

		const updatedWorksheet = await Worksheet.findByIdAndUpdate(id, req.body, { new: true });

		res.status(200).json(updatedWorksheet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteWorksheetById = async (req, res) => {
	const user = req.user;
	const { id } = req.params;

	try {
		const worksheet = await Worksheet.findById(id);

		if (!worksheet) {
			return res.status(404).json({ message: 'Worksheet not found' });
		}

		if (
			user._id !== String(worksheet.instructor) &&
			user.type !== 'admin' &&
			user.type !== 'supervisor'
		) {
			return res.status(403).json({
				message: 'You are not authorized to delete this worksheet',
			});
		}

		await worksheet.deleteOne();

		res.status(200).json({ message: 'Worksheet deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
