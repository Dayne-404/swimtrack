import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
	name: string;
	to: string;
}

const BackButton = ({name, to }: BackButtonProps) => {
	const navigate = useNavigate();

	return (
		<Box mb={2}>
			<Button
				variant="text"
				startIcon={<ArrowBackIcon />}
				onClick={() => navigate(to)}
			>
				{name}
			</Button>
		</Box>
	);
};

export default BackButton;
