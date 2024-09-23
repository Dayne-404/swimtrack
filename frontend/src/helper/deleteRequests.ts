import { apiRequest } from "./apiRequest";

export const deleteWorksheetById = async (worksheetId: string) => {
	return apiRequest({
		method: 'DELETE',
		endpoint: `/worksheets/${worksheetId}`,
	})
};

export const deleteGroupById = async (groupId: string) => {
	return apiRequest({
		method: 'DELETE',
		endpoint: `/groups/${groupId}`,
	})
};
