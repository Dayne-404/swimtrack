import { Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

interface GroupButtonProps {
	id?: string | null;
	groupName?: string;
	newFolder?: boolean;
}

const GroupButton = ({groupName = '', newFolder, id = null}: GroupButtonProps) => {
	const buttonIcon = newFolder ? <CreateNewFolderIcon /> : <FolderIcon />;
	const navigate = useNavigate();

    const ButtonStyle = {
        textTransform: 'none',
        height: 60,
    }

	return (
		<Grid item xs={6} md={3}>
			<Button
				size="large"
				sx={ButtonStyle}
				variant="outlined"
				fullWidth
				endIcon={buttonIcon}
				onClick={() => id ? navigate(`./${id}`) : undefined}
			>
				<Typography variant="body1">
					{newFolder ? 'New Group' : groupName}
				</Typography>
			</Button>
		</Grid>
	);
};

export default GroupButton;
