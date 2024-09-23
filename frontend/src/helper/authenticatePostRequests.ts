import { apiRequest } from "./apiRequest";

export const login = async (userCredentials: {
	email: string;
	password: string;
}) => {
	return apiRequest({
		method: 'POST',
		endpoint: '/authenticate/login',
		body: JSON.stringify(userCredentials),
		tokenRequired: false,
	});
};

export const validateToken = async (token: string): Promise<boolean> => {
	const res = await fetch(
		'http://localhost:3000/api/authenticate/checkToken',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (res.status === 200) {
		return true;
	}

	return false;
};