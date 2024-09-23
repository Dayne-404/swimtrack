import { apiRequest } from "./apiRequest";

export const removeWorksheetFromGroup = async (
	groupId: string,
	worksheetIds: string[]
) => {
	return apiRequest({
		method: 'PUT',
		endpoint: `groups/${groupId}`,
		body: JSON.stringify({worksheetIds: worksheetIds}),
	})
};
