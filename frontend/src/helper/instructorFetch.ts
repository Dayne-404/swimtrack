import { InstructorPublic } from "../config/instructorType"

interface fetchInstructorsProps {
	limit?: number;
	skip?: number;
	search?: string;
	filters?: string;
	sorting?: string;
}

export const fetchInstructors = async ({
	limit = undefined,
	skip = undefined,
	search = '',
	filters = '',
	sorting = '',
}: fetchInstructorsProps): Promise<InstructorPublic[]> => {
	let uri = `http://localhost:3000/api/instructors?`;

	if (limit) { uri += `&limit=${limit}`; }
	if (skip) { uri += `&skip=${skip}`; }
	if (search) { uri += `&search=${search}`; }
	if (filters) { uri += filters; }
	if (sorting) { uri += sorting; }

	const res = await fetch(uri);
	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}
	return res.json();
};