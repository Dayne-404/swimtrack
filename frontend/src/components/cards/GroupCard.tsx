import { Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';

interface GroupButtonProps {
	id?: string | null;
	groupName?: string;
}

const GroupButton = ({ groupName = '', id = null }: GroupButtonProps) => {
	const navigate = useNavigate();

	const ButtonStyle = {
		textTransform: 'none',
		height: 60,
	};

	return (
		<Grid item xs={6} md={3}>
			<Button
				size="large"
				sx={ButtonStyle}
				variant="outlined"
				fullWidth
				endIcon={<FolderIcon />}
				onClick={() => (id ? navigate(`./${id}`) : undefined)}
			>
				<Typography variant="body1">{groupName}</Typography>
			</Button>
		</Grid>
	);
};

export default GroupButton;
