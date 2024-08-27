import { Box, Grid, Button } from '@mui/material';
import { CARDS } from '../../config/cards';
import WorksheetCard from '../cards/WorksheetCard';

const LibraryCards = () => {
	return (
		<Box overflow="auto">
			<Grid container>
				{CARDS.map((card, index) => (
					<Grid item xs={12} sm={6} md={4} p={0.5} key={index}>
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
				<Grid
					item
					xs={12}
					sm={12}
					md={12}
					key={'button'}
					p={0.5}
					pt={2}
				></Grid>
				<Button fullWidth variant="contained">
					View More
				</Button>
			</Grid>
		</Box>
	);
};

export default LibraryCards;
