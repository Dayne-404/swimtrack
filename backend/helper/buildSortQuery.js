import { SORT_FIELDS } from '../config/WorksheetOrdering.js';

const buildSortQuery = (sort) => {
	let sortQuery = {};
	const sortArray = Array.isArray(sort) ? sort : [sort];

	SORT_FIELDS.forEach((field) => {
		sortArray.forEach((requestedField) => {
			const order = requestedField.startsWith('-') ? -1 : 1;
			const key = requestedField.replace(/^-/, '');
			if (key === field) sortQuery[field] = order;
		});
	});

	return sortQuery;
};

export default buildSortQuery;