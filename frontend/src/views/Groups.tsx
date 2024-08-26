import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { GROUPS } from '../config/groups';

export const Groups = () => {
	const { groupId } = useParams();
	const navigate = useNavigate();

	const group = GROUPS.find((group) => group.id === groupId);

	return (
		<Box display="flex" flexDirection="column" flex={1} maxHeight="100%">
            <Box>
                <Button
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/library')}
                >
                    Groups
                </Button>
            </Box>
			<Paper
				sx={{
					marginTop: 2,
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					overflow: 'auto',
					padding: 2,
				}}
			>
				{group ? (
					<Stack direction='row' spacing={1} alignItems='center'>
						<FolderOpenIcon fontSize='large' />
						<Typography variant="h6">{group.name}</Typography>
					</Stack>
				) : (
					<Typography variant="h6">Something went wrong??</Typography>
				)}
			</Paper>
		</Box>
	);
};
