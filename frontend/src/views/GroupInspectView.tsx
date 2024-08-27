import { useParams } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { GROUPS } from '../config/groups';
import BackButton from '../components/inputs/BackButton';

export const GroupInspectView = () => {
	const { groupId } = useParams();

	const group = GROUPS.find((group) => group.id === groupId);

	return (
		<Box display="flex" flexDirection="column" flex={1} maxHeight="100%">
            	<BackButton name='Groups' to='/groups' />
			<Paper
				sx={{
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
