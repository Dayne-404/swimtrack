import { getToken } from './getToken';

const API_BASE_URL = 'http://localhost:3000/api';

interface ApiRequestProps {
	endpoint: string;
	method?: string;
	params?: URLSearchParams;
	body?: string;
	tokenRequired?: boolean;
}

export const apiRequest = async ({
	endpoint,
	method = 'GET',
	params,
	body,
	tokenRequired = true,
}: ApiRequestProps) => {
	let uri = `${API_BASE_URL}${endpoint}`;

	if (params) uri += `?${params.toString()}`;

	const token = tokenRequired ? getToken() : null;

	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
		},
		...(body && { body: body }),
	};

	const res = await fetch(uri, options);
	if (!res.ok) {
		const errorData = await res.json();
		const errorMessage = errorData.message || 'Network response was not ok';
		throw new Error(errorMessage);
	}

	return res.json();
};
