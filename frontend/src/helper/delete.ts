export const deleteWorksheetById = async (worksheetId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/worksheets/${worksheetId}`,
		{
			method: 'DELETE',
		}
	);
	if (!res.ok) {
		throw new Error('Network response was not ok');
	}
	return res.json();
};

export const deleteGroupById = async (groupId: string) => {
	const res = await fetch(`http://localhost:3000/api/groups/${groupId}`, {
		method: 'DELETE',
	});
	if (!res.ok) {
		throw new Error('Network response was not ok');
	}
	return res.json();
};
