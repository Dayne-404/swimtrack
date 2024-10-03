import { FILTER_FIELDS } from "../config/WorksheetOrdering.js";

const buildFiltersQuery = (filters, userId, specific) => {
	let query = {};

	if (specific && userId) query.instructor = userId;
	else if (filters.instructor) query.instructor = filters.instructor;

	FILTER_FIELDS.forEach((field) => {
		if (filters[field]) {
			query[field] = {
				$in: Array.isArray(filters[field]) ? filters[field] : [filters[field]],
			};
		}
	});

	return query;
};

export default buildFiltersQuery;