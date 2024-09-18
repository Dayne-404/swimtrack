export const removeWorksheetFromGroup = async (
	groupId: string,
	worksheetIds: string[]
) => {
	const res = await fetch(`http://localhost:3000/api/groups/${groupId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ worksheetIds: worksheetIds }),
	});

	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}
	return res.json();
};
