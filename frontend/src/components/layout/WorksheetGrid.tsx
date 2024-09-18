import { Worksheet } from '../../config/worksheetType';
import { Box, Grid, Typography } from '@mui/material';
import WorksheetCard from '../cards/WorksheetCard';
import Loading from './Loading';

interface WorksheetGridProps {
	worksheets?: Worksheet[];
	selectable?: {
		canSelect: boolean;
		selected: string[];
		setSelected: React.Dispatch<React.SetStateAction<string[]>>;
	};
	includeInstructor?: boolean;
	loading?: boolean;
	numWorksheets?: {
		displayed: number;
		total: number;
	};
	BottomButton?: React.ReactElement;
}

const WorksheetGrid = ({
	worksheets = [],
	includeInstructor = true,
	loading = false,
	numWorksheets,
	BottomButton,
	selectable,
}: WorksheetGridProps) => {
	const handleSelectWorksheet = (worksheetId: string) => {
		if (!selectable) return;

		selectable.setSelected((prevSelected) =>
			prevSelected.includes(worksheetId)
				? prevSelected.filter((id) => id !== worksheetId)
				: [...prevSelected, worksheetId]
		);
	};

	if (loading) {
		return <Loading />;
	}

	if (worksheets.length === 0) {
		return (
			<Box textAlign="center" py={3}>
				<Typography variant="h5">No Worksheets Found</Typography>
			</Box>
		);
	}

	return (
		<Grid container>
			{numWorksheets && worksheets.length > 0 && (
				<Grid item xs={12} pb={0.5} textAlign="center">
					<Typography variant="subtitle1" color="text.secondary">
						Showing {numWorksheets.displayed} worksheets out of |{' '}
						{numWorksheets.total}
					</Typography>
				</Grid>
			)}
			{worksheets.map((worksheet) => (
				<Grid item xs={12} sm={6} md={4} p={0.5} key={worksheet._id}>
					<WorksheetCard
						onClick={
							selectable?.canSelect
								? () => handleSelectWorksheet(worksheet._id)
								: undefined
						}
						worksheet={worksheet}
						IncludeInstructor={includeInstructor}
						selected={selectable?.selected.includes(worksheet._id)}
					/>
				</Grid>
			))}

			{BottomButton && (
				<Grid
					item
					xs={12}
					p={0.5}
					display="flex"
					justifyContent="center"
				>
					{BottomButton}
				</Grid>
			)}
		</Grid>
	);
};

export default WorksheetGrid;
