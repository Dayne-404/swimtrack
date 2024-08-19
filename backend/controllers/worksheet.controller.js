const Worksheet = require('../models/Worksheet.model.js');

const getWorksheets = async (req, res) => {
	console.log(req.query);
    try {
		const worksheets = await Worksheet.find({});
		res.status(200).json(worksheets);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getWorksheetById = async (req, res) => {
	try {
		const { id } = req.params;
		const worksheet = await Worksheet.findById(id);
		res.status(200).json(worksheet);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createWorksheet = async (req, res) => {
	try {
		const worksheet = await Worksheet.create(req.body);
		res.status(200).json(worksheet);
	} catch (error) {
		console.log(error);
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
	createWorksheet,
	updateWorksheetById,
    deleteWorksheetById
};
