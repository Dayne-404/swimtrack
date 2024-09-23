import { InstructorPublic } from '../config/instructorType';
import { apiRequest } from './apiRequest';

interface fetchInstructorsProps {
	limit?: number;
	skip?: number;
	search?: string;
}

export const fetchInstructors = async ({
	limit,
	skip,
	search,
}: fetchInstructorsProps): Promise<InstructorPublic[]> => {
	const params = new URLSearchParams();
	if (search) params.append('search', search);
	if (limit) params.append('limit', String(limit));
	if (skip) params.append('skip', String(skip));

	console.log('SEARCH: ', search);
	
	return apiRequest({
		endpoint: '/instructors',
		params: params,
	});
};
