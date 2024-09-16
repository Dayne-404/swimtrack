interface fetchWorksheetsProps {
	limit?: number;
	skip?: number;
	filters?: string;
	sorting?: string;
}

export const fetchWorksheets = async ({
	limit = undefined,
	skip = undefined,
	filters = '',
	sorting = '',
}: fetchWorksheetsProps) => {
	let uri = 'http://localhost:3000/api/worksheets?';

	if (limit) { uri += `&limit=${limit}`; }
	if (skip) { uri += `&skip=${skip}`; }
	if (filters) { uri += filters; }
	if (sorting) { uri += sorting; }

	console.log('URI: ', uri);
	const res = await fetch(uri);
	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}
	return res.json();
};

export const fetchWorksheetsByInstructor = async (instructorId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/worksheets/instructor/${instructorId}`
	);
	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}
	return res.json();
};

export const fetchWorksheetById = async (worksheetId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/worksheets/${worksheetId}`
	);
	if (!res.ok) {
		throw new Error('Network response was not ok');
	}
	return res.json();
};
