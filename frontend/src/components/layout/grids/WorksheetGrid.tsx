import { Worksheet } from '../../../config/worksheetType';
import { Box, Grid, Typography } from '@mui/material';
import WorksheetCard from '../../cards/WorksheetCard';
import Loading from '../main/Loading';

interface WorksheetGridProps {
	worksheets?: Worksheet[];
	selectable?: {
		canSelect: boolean;
		selected: string[];
		setSelected: React.Dispatch<React.SetStateAction<string[]>>;
	};
	includeInstructor?: boolean;
	loading?: boolean;
	BottomButton?: React.ReactElement;
	gridSpace?: number;
	alignItems?: 'center';
}

const WorksheetGrid = ({
	worksheets = [],
	includeInstructor = true,
	loading = false,
	selectable,
	gridSpace = 3,
	alignItems,
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
		<Box
			width="100%"
			alignItems={alignItems && alignItems}
			display="flex"
		>
			<Grid container>
				{worksheets.map((worksheet) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={gridSpace}
						p={0.5}
						key={worksheet._id}
					>
						<WorksheetCard
							onClick={
								selectable?.canSelect
									? () => handleSelectWorksheet(worksheet._id)
									: undefined
							}
							worksheet={worksheet}
							IncludeInstructor={includeInstructor}
							selected={selectable?.selected.includes(
								worksheet._id
							)}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default WorksheetGrid;
