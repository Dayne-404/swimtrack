import { Grid, Box, Typography } from '@mui/material';
import WorksheetCard from '../components/WorksheetCard';

const Dashboard = () => {
	const cards = [
		{
			level: 'Swimmer 2',
			session: 'Summer',
			day: 'Wed',
			time: '12:30',
			year: '2024',
			createdOn: 'July 5 2023',
		},
		{
			level: 'Swimmer 2',
			session: 'Summer',
			day: 'Wed',
			time: '12:30',
			year: '2024',
			createdOn: 'July 5 2023',
		},
		{
			level: 'Swimmer 2',
			session: 'Summer',
			day: 'Wed',
			time: '12:30',
			year: '2024',
			createdOn: 'July 5 2023',
		},
		{
			level: 'Swimmer 2',
			session: 'Summer',
			day: 'Wed',
			time: '12:30',
			year: '2024',
			createdOn: 'July 5 2023',
		},
	];

	return (
        <Box>
            <Box pb={3}>
                <Typography variant='h5'>Your Recent Worksheets</Typography>
                <Grid container my={2} rowSpacing={1} columnSpacing={2}>
                    {cards.map((card, index) => (
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
                <Typography variant='h5'>Your Saved Worksheets</Typography>
                <Grid container my={2} rowSpacing={1} columnSpacing={2}>
                    {cards.map((card, index) => (
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
