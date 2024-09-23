import { getToken } from "./getToken";

export const deleteWorksheetById = async (worksheetId: string) => {
	const token = getToken();
	
	const res = await fetch(
		`http://localhost:3000/api/worksheets/${worksheetId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
		}
	);
	if (!res.ok) {
		throw new Error('Network response was not ok');
	}
	return res.json();
};

export const deleteGroupById = async (groupId: string) => {
	const token = getToken();

	const res = await fetch(`http://localhost:3000/api/groups/${groupId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		},
	});
	if (!res.ok) {
		throw new Error('Network response was not ok');
	}
	return res.json();
};
