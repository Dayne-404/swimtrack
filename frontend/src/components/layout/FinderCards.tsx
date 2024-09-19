import { Box, Button } from '@mui/material';
import { Worksheet } from '../../config/worksheetType';
import WorksheetGrid from './WorksheetGrid';

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
		<Box width="100%">
			<WorksheetGrid
				worksheets={worksheets}
				numWorksheets={{
					displayed: currentWorksheets,
					total: totalWorksheets,
				}}
				BottomButton={
					moreWorksheets ? (
						<Button
							variant="contained"
							onClick={handleViewMore}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'View More'}
						</Button>
					) : undefined
				}
			/>
		</Box>
	);
};

export default LibraryCards;
