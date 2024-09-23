import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

	const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

	return <Button onClick={logout}>Logout</Button>;
};

export default LogoutButton;
