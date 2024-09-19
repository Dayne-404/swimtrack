import { Grid, Box, Typography } from '@mui/material';

const Dashboard = () => {
	return (
		<Box>
			<Box pb={3}>
				<Typography variant="h5">Your Recent Worksheets</Typography>
				<Grid container my={2} spacing={1}>
					
				</Grid>
			</Box>
			<Box pb={3}>
				<Typography variant="h5">Your Saved Worksheets</Typography>
				<Grid container my={2} spacing={1}>
					
				</Grid>
			</Box>
		</Box>
	);
};

export default Dashboard;
