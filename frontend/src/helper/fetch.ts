export const fetchWorksheets = async () => {
	const res = await fetch('http://localhost:3000/api/worksheets');
	if (!res.ok) {
		throw new Error('Network response was not ok');
	}
	return res.json();
};

export const fetchWorksheetsByInstructor = async (instructorId: string) => {
	const res = await fetch(
		`http://localhost:3000/api/worksheets/instructor/${instructorId}`
	);
	if (!res.ok) {
		throw new Error('Network response was not ok');
	}
	return res.json();
};
