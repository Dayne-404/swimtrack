import { Grid, Box, Typography } from '@mui/material';
import { CARDS } from '../config/cardsPLACEHOLDER';
import WorksheetCard from '../components/cards/WorksheetCard';

const Dashboard = () => {
	return (
		<Box>
			<Box pb={3}>
				<Typography variant="h5">Your Recent Worksheets</Typography>
				<Grid container my={2} spacing={1}>
					{CARDS.map((card, index) => (
						<Grid item xs={6} sm={6} md={3} key={index}>
							<WorksheetCard
								level={card.level}
								session={card.session}
								day={card.day}
								time={card.time}
								year={card.year}
								createdOn={card.createdOn}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
			<Box pb={3}>
				<Typography variant="h5">Your Saved Worksheets</Typography>
				<Grid container my={2} spacing={1}>
					{CARDS.map((card, index) => (
						<Grid item xs={6} sm={6} md={3} key={index}>
							<WorksheetCard
								level={card.level}
								session={card.session}
								day={card.day}
								time={card.time}
								year={card.year}
								createdOn={card.createdOn}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default Dashboard;
