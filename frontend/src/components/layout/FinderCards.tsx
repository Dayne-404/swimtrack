import { Box, Grid, Button, Typography } from '@mui/material';
import WorksheetCard from '../cards/WorksheetCard';
import { Worksheet } from '../../config/worksheetType';

interface LibraryCardsProps {
	totalWorksheets: number;
	currentWorksheets: number;
	worksheets: Worksheet[];
	loading: boolean;
	moreWorksheets: boolean;
	handleViewMore: () => void;
}

const LibraryCards = ({
	totalWorksheets = 0,
	currentWorksheets = 0,
	worksheets,
	moreWorksheets,
	loading,
	handleViewMore,
}: LibraryCardsProps) => {
	return (
		<Box overflow="auto" width="100%">
			{worksheets.length === 0 && (
				<Box textAlign="center" py={3}>
					<Typography variant="h5">No Worksheets Found</Typography>
				</Box>
			)}
			<Grid container>
				<Grid item xs={12} pb={0.5} textAlign="center">
					<Typography variant="subtitle1" color="text.secondary">
						Showing {currentWorksheets} worksheets out of |{' '}
						{totalWorksheets}
					</Typography>
				</Grid>
				{worksheets.map((worksheet) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						p={0.5}
						key={worksheet._id}
					>
						<WorksheetCard
							id={worksheet._id}
							instructor={worksheet.instructor}
							location={worksheet.location}
							level={worksheet.level}
							session={worksheet.session}
							day={worksheet.day}
							time={worksheet.time}
							year={worksheet.year}
							createdOn={worksheet.createdAt}
						/>
					</Grid>
				))}
				{moreWorksheets && (
					<Grid item xs={12} p={0.5} pt={2}>
						<Button
							fullWidth
							variant="contained"
							onClick={handleViewMore}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'View More'}
						</Button>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default LibraryCards;
