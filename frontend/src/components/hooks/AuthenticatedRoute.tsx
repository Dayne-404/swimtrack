import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { validateToken } from '../../helper/submit';
import { useUser } from './useUser';

interface AuthenticatedRouteProps {
	children: JSX.Element;
}

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
	const { setUser } = useUser();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		const checkToken = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setIsAuthenticated(false);
				return;
			}

			try {
				const state = await validateToken(token);

				if (state) {
					const decoded = jwtDecode<{
						id: string;
						name: string;
						type: string;
					}>(token);
					console.log('DECODED', decoded);
					setUser(decoded);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
					localStorage.removeItem('token');
				}
			} catch (error) {
				setIsAuthenticated(false);
				localStorage.removeItem('token');
			}
		};

		checkToken();
	}, [setUser]);

	if (isAuthenticated === null) {
		return <div>Loading...</div>;
	}

	return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthenticatedRoute;
