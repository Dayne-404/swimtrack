const Group = require('../models/Group.model.js');

const getGroupsByInstructor = async (req, res) => {
	const { id } = req.params;
	const { limit = 20, skip = 0, sort = '-createdAt', search = '' } = req.query;

	try {
		let searchQuery = { instructor: id };

		if (search) {
			searchQuery = {
				...searchQuery,
				$or: [{ name: { $regex: search, $options: 'i' } }],
			};
		}

		let sortQuery = {};
		const order = sort.startsWith('-') ? -1 : 1;
		const key = sort.replace(/^-/, '');
		sortQuery[key] = order;

		const groups = await Group.find(searchQuery)
			.sort(sortQuery)
			.skip(parseInt(skip))
			.limit(parseInt(limit));

		const totalCount = await Group.countDocuments({ instructor: id });

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
		const group = await Group.findById(id).populate({
			path: 'worksheets',
			populate: {
				path: 'instructor',
				select: '_id name',
			},
		});

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

const addWorksheetToGroups = async (req, res) => {
	try {
		const { worksheetId, groupIds } = req.body;

		if (!Array.isArray(groupIds) || !worksheetId) {
			return res.status(400).json({ message: 'Invalid input' });
		}

		const updatePromises = groupIds.map(async (groupId) => {
			try {
				const updatedGroup = await Group.findByIdAndUpdate(
					groupId,
					{ $addToSet: { worksheets: worksheetId } },
					{ new: true, runValidators: true }
				).exec();

				if (!updatedGroup) {
					console.warn(`Group with ID ${groupId} not found`);
				}

				return updatedGroup;
			} catch (err) {
				console.error(`Error updating group with ID ${groupId}:`, err);
				return null;
			}
		});

		const updatedGroups = await Promise.all(updatePromises);

		res.status(200).json({
			message: 'Worksheet added to groups',
			totalUpdatedGroups: updatedGroups.filter((group) => group !== null)
				.length,
		});
	} catch (error) {
		console.error('Unexpected error:', error);
		res.status(500).json({ message: error.message });
	}
};

const deleteGroupById = async (req, res) => {
	try {
		const { id } = req.params;

		const group = await Group.findByIdAndDelete(id);

		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		res.status(200).json({ messaage: 'Group deleted sucessfully' });
	} catch (error) {
		res.status(500).json({ messaage: error.message });
	}
};

const removeWorksheetsFromGroup = async (req, res) => {
	const { id } = req.params;
	const { worksheetIds } = req.body;

	if (!Array.isArray(worksheetIds)) {
		worksheetIds = [worksheetIds];
	}

	try {
		const group = await Group.findByIdAndUpdate(
			id,
			{ $pull: { worksheets: { $in: worksheetIds } } },
			{ new: true }
		);

		if (!group) {
			return res.status(404).json({ message: 'Group not found' });
		}

		res.status(200).json({ messaage: 'Worksheets removed sucessfully' });
	} catch (error) {
		console.err(error);
		res.status(500).json({ messaage: error.messaage });
	}
};

module.exports = {
	deleteGroupById,
	getGroupsByInstructor,
	createGroup,
	addWorksheetToGroup,
	getGroupById,
	getWorksheetsByGroupId,
	addWorksheetToGroups,
	removeWorksheetsFromGroup,
};
