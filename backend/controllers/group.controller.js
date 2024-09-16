const Group = require('../models/Group.model.js');

const getGroupsByInstructor = async (req, res) => {
	const { id } = req.params;
	const { limit = 20, skip = 0, search = '' } = req.query;

	console.log('GROUP BY INSTRUCTOR: ', id, 'SEARCH: ', search );

	try {
		let searchQuery = { instructor: id };

		if(search) {
			searchQuery = {
				...searchQuery,
				$or: [
					{ name: { $regex: search, $options: 'i' } },
				],
			};
		}

		const groups = await Group.find(searchQuery)
			.limit(parseInt(limit))
			.skip(parseInt(skip));
		const totalCount = await Group.countDocuments({instructor: id});
		
		res.status(200).json({ groups, totalCount });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const addWorksheetToGroup = async (worksheetId, groupId) => {
	try {
		await Group.findByIdAndUpdate(
			groupId,
			{ $addToSet: { worksheetIds: worksheetId } },
			{ new: true }
		);
	} catch (error) {
		console.error('Error adding worksheet to group:', error);
		res.status(500).json({ message: error.message });
	}
};

const createGroup = async (req, res) => {
	try {
		const { instructor, name, worksheetIds } = req.body;

		const newGroup = await Group.create({
			instructor,
			name,
			worksheetIds: worksheetIds || [],
		});

		res.status(200).json(newGroup);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getWorksheetsByGroupId = async (req, res) => {
	try {
		const { id } = req.params;
		const group = await Group.findById(id).populate('worksheets');

		res.status(200).json(group);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

const getGroupById = async (req, res) => {
	try {
		const { id } = req.params;
		const group = await Group.findById(id);

		res.status(200).json(group);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getGroupsByInstructor,
	createGroup,
	addWorksheetToGroup,
	getGroupById,
	getWorksheetsByGroupId,
};
