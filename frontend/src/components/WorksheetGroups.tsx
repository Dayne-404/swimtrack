import { Paper, Grid, Box, Typography, Button, Stack, ButtonBase } from '@mui/material';
import { GROUPS } from '../config/groups';
import GroupButton from './GroupButton';
import { useNavigate } from 'react-router-dom';

interface Group {
	id: string;
	name: string;
	worksheets: string[];
}

interface WorksheetGroupsProps {
	fullPage?: boolean;
}

const WorksheetGroups = ({fullPage = false} : WorksheetGroupsProps) => {
	const navigate = useNavigate();
	const groups: Group[] = GROUPS;
	const displayedGroups = groups.slice(0, 7);

	const paperStyle = {
		display: 'flex',
		padding: 1.5,
		flex: fullPage ? 1 : 0,
	};

	return (
		<Paper sx={paperStyle}>
			<Box sx={{width: '100%', overflowY: 'auto'}}>
					<ButtonBase onClick={() => navigate('/library/groups')}>
						<Typography variant="h6" fontWeight="400" gutterBottom>
							Groups
						</Typography>
					</ButtonBase>
				<Grid container spacing={1} justifyContent="undefined">
					<GroupButton newFolder key={'new-folder-btn'} />
					{displayedGroups.map((group) => (
						<GroupButton
							id={group.id}
							key={group.id}
							groupName={group.name}
						/>
					))}
				</Grid>
				{groups.length >= 8 ? (
					<Stack pt={1.5} alignItems="center">
						<Button onClick={() => navigate('/library/groups')}>View all</Button>
					</Stack>
				) : (
					<></>
				)}
			</Box>
		</Paper>
	);
};

export default WorksheetGroups;
