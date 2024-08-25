import { Button, Typography, Grid } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

interface GroupButtonProps {
	groupName?: string;
	newFolder?: boolean;
}

const GroupButton = ({ groupName = '', newFolder }: GroupButtonProps) => {
	const buttonIcon = newFolder ? <CreateNewFolderIcon /> : <FolderIcon />;

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
			>
				<Typography variant="body1">
					{newFolder ? 'New Group' : groupName}
				</Typography>
			</Button>
		</Grid>
	);
};

export default GroupButton;
