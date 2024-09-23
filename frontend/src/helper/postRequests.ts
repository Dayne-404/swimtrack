import { newWorksheet } from '../config/worksheetType';
import { apiRequest } from './apiRequest';

export const submitWorksheet = async (
	worksheet: newWorksheet,
	worksheetId?: string
) => {
	const worksheetJSON = getWorksheetJSON(worksheet);

	return apiRequest({
		method: worksheetId ? 'PUT' : 'POST',
		endpoint: `/worksheets${worksheetId ? '/' + worksheetId : ''}`,
		body: worksheetJSON,
	});
};

export const submitWorksheetToGroups = async (
	worksheetId: string,
	groupIds: string[]
) => {
	return apiRequest({
		method: 'PUT',
		endpoint: '/groups/addWorksheetToGroups',
		body: JSON.stringify({ worksheetId: worksheetId, groupIds: groupIds }),
	});
};

export const createGroup = async (
	instructor: string,
	name: string,
	worksheetIds?: string[]
) => {
	return apiRequest({
		method: 'POST',
		endpoint: '/groups',
		body: JSON.stringify({
			instructor: instructor,
			name: name,
			worksheetIds: worksheetIds,
		}),
	});
};

const getWorksheetJSON = (header: newWorksheet) => {
	const instructorId =
		typeof header.instructor === 'string'
			? header.instructor
			: header.instructor._id;

	return JSON.stringify({
		...header,
		instructor: instructorId,
		year: Number(header.year),
	});
};
