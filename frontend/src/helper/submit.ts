import { newWorksheet } from '../config/worksheetType';

export const submitNewWorksheet = async (header: newWorksheet) => {
	const worksheetJSON = getWorksheetJSON(header);

	const res = await fetch('http://localhost:3000/api/worksheets', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: worksheetJSON,
	});

	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}
	return res.json();
};

export const submitUpdatedWorksheet = async (
	worksheetId: string,
	header: newWorksheet
) => {
	const worksheetJSON = getWorksheetJSON(header);

	const res = await fetch(
		`http://localhost:3000/api/worksheets/${worksheetId}`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: worksheetJSON,
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}
	return res.json();
};

export const submitWorksheetToGroups = async (
	worksheetId: string,
	groupIds: string[]
) => {
	const res = await fetch(
		`http://localhost:3000/api/groups/addWorksheetToGroups`,
		{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				worksheetId: worksheetId,
				groupIds: groupIds,
			}),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}
	return res.json();
};

export const createGroup = async (
	instructor: string,
	name: string,
	worksheetIds?: string[]
) => {
	const res = await fetch(
		`http://localhost:3000/api/groups`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				instructor: instructor,
				name: name,
				worksheetIds: worksheetIds,
			}),
		}
	);

	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}
	return res.json();
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
