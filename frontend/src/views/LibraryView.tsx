import { CircularProgress, Grid, Stack } from '@mui/material';
import View from '../components/layout/View';
import { fetchWorksheetsByInstructor } from '../helper/fetch';
import { useEffect, useState } from 'react';
import WorksheetCard from '../components/cards/WorksheetCard';
import { Worksheet } from '../config/worksheetType';
import SnackbarAlert from '../components/layout/SnackbarAlert';

interface SnackbarState {
	open: boolean;
	message: string;
	severity: 'success' | 'error';
}

const Library = () => {
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [snackBarState, setSnackbarState] = useState<SnackbarState>({
		open: false,
		message: '',
		severity: 'error',
	});

	useEffect(() => {
		const getWorksheets = async () => {
			try {
				const data: Worksheet[] = await fetchWorksheetsByInstructor(
					'Dayne'
				);
				setWorksheets(data);
			} catch (error) {
				setSnackbarState({
					open: true,
					message: `${error}`,
					severity: 'error',
				});
			} finally {
				setLoading(false);
			}
		};

		getWorksheets();
	}, []);

	const loadingComponent = () => {
		if (loading) {
			return (
				<Stack width="100%" alignItems="center" pt={5}>
					<CircularProgress size={60} />
				</Stack>
			);
		}
		return;
	};

	return (
		<View
			maxHeight={80}
			headerText="Library"
			body={
				<>
					<SnackbarAlert
						snackbarState={snackBarState}
						setSnackbarState={setSnackbarState}
					/>
					{loadingComponent()}
					<Grid container spacing={1.5}>
						{worksheets.map((worksheet) => (
							<Grid
								item
								xs={6}
								sm={6}
								md={3}
								key={`worksheet-item-${worksheet._id}`}
							>
								<WorksheetCard
									id={worksheet._id}
									key={worksheet._id}
									level={worksheet.level}
									session={worksheet.session}
									day={worksheet.day}
									time={worksheet.time}
									year={worksheet.year}
									createdOn={worksheet.createdAt}
								/>
							</Grid>
						))}
					</Grid>
				</>
			}
		/>
	);
};

export default Library;
