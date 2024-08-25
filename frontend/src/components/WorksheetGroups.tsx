import { Paper, Grid, Box, Typography } from '@mui/material';
import GroupButton from './GroupButton';

interface WorksheetGroupsProps {
	paperStyle: object;
}

const WorksheetGroups = ({ paperStyle }: WorksheetGroupsProps) => {
	return (
		<Paper sx={paperStyle}>
			<Box sx={{ maxHeight: '50vh', width: '100%', overflowY: 'auto' }}>
				<Typography variant="h6" fontWeight="400" gutterBottom>
					Groups
				</Typography>
				<Grid container spacing={1}>
					<GroupButton newFolder />
					<GroupButton groupName="Summer 2023" />
					<GroupButton groupName="Summer 2025" />
					<GroupButton groupName="Summer 2023" />
					<GroupButton groupName="Summer 2023" />
					<GroupButton groupName="Summer 2023" />
				</Grid>
			</Box>
		</Paper>
	);
};

export default WorksheetGroups;
