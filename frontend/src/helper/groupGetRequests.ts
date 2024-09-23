import { FetchedGroup, Group } from '../config/groupType';
import { apiRequest } from './apiRequest';
import { buildQueryParams } from './buildQueryParams';
interface fetchGroupsByInstructorProps {
	instructorId: string;
	limit?: number;
	skip?: number;
	search?: string;
	sorting?: Record<string, number>;
}
export interface FetchGroupsResponse {
	groups: Group[];
	totalCount: number;
}

export const fetchGroupsByInstructor = async ({
	instructorId,
	limit,
	skip,
	sorting,
}: fetchGroupsByInstructorProps) => {
	const params = buildQueryParams({}, sorting);
	if (limit) params.append('limit', String(limit));
	if (skip) params.append('skip', String(skip));

	return apiRequest({
		endpoint: `/groups/instructor/${instructorId}`,
		params: params,
	});
};

export const fetchGroupById = async ({
	groupId,
}: {
	groupId: string;
}): Promise<FetchedGroup> => {
	return apiRequest({
		endpoint: `/groups/${groupId}/worksheets`,
	});
};
