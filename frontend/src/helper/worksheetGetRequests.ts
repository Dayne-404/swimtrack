import { apiRequest } from './apiRequest';
import { buildQueryParams } from './buildQueryParams';

interface fetchWorksheetsProps {
	instructorId?: string;
	limit?: number;
	skip?: number;
	filters?: Record<string, (number | string)[]>;
	sorting?: Record<string, number>;
	specific?: boolean;
}

export const fetchWorksheets = async ({
	limit,
	skip,
	filters,
	sorting,
	specific = false,
}: fetchWorksheetsProps) => {
	const params = buildQueryParams(filters, sorting);
	if (limit) params.append('limit', String(limit));
	if (skip) params.append('skip', String(skip));
	if (specific) params.append('specific', 'true');

	return apiRequest({
		endpoint: '/worksheets',
		params: params
	})
};

export const fetchWorksheetsByInstructor = async ({
	instructorId,
	limit,
	skip,
	filters,
	sorting,
}: fetchWorksheetsProps) => {
	const params = buildQueryParams(filters, sorting);
	if (limit) params.append('limit', String(limit));
	if (skip) params.append('skip', String(skip));

	return apiRequest({
		endpoint: `/worksheets/instructor/${instructorId}`,
		params: params
	})
};

export const fetchWorksheetById = async (worksheetId: string) => {
	return apiRequest({
		endpoint: `/worksheets/${worksheetId}`
	})
};
