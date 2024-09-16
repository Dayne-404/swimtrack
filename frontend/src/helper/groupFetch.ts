import { FetchedGroup, Group } from "../config/groupType";

interface fetchGroupsByInstructorProps {
	instructorId: string;
	limit?: number;
	skip?: number;
	search?: string;
	filters?: string;
	sorting?: string;
}

interface fetchGroupByIdProps {
	groupId: string
}

export interface FetchGroupsResponse {
    groups: Group[];
    totalCount: number;
}

export const fetchGroupsByInstructor = async ({
	instructorId,
	limit = undefined,
	skip = undefined,
	search = '',
	filters = '',
	sorting = '',
}: fetchGroupsByInstructorProps): Promise<FetchGroupsResponse> => {
	let uri = `http://localhost:3000/api/groups/instructor/${instructorId}?`;

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

export const fetchGroupById = async ({
	groupId,
}: fetchGroupByIdProps): Promise<FetchedGroup> => {
	const uri = `http://localhost:3000/api/groups/${groupId}/worksheets`;

	const res = await fetch(uri);

	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}

	return res.json();
};