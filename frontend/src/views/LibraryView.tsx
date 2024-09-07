import { CircularProgress, Grid, Stack } from '@mui/material';
import { fetchWorksheetsByInstructor } from '../helper/fetch';
import { useEffect, useState } from 'react';
import WorksheetCard from '../components/cards/WorksheetCard';
import { Worksheet } from '../config/worksheetType';
import SnackbarAlert from '../components/layout/SnackbarAlert';

const Library = () => {
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		const getWorksheets = async () => {
			try {
				const data: Worksheet[] = await fetchWorksheetsByInstructor(
					'Dayne'
				);
				setWorksheets(data);
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: 'An unkown error occurred';

				setErrorMessage(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		getWorksheets();
	}, [errorMessage]);

	const Loading = () => {
		return (
			<Stack width="100%" alignItems="center" pt={5}>
				<CircularProgress size={60} />
			</Stack>
		);
	};

	return (
		<>
			<SnackbarAlert
				open={Boolean(errorMessage)}
				message={errorMessage}
				setState={setErrorMessage}
			/>

			{loading ? (
				<Loading />
			) : (
				<Grid container spacing={1.5}>
					{worksheets.map((worksheet) => (
						<Grid item sm={6} md={3} key={worksheet._id}>
							<WorksheetCard worksheet={worksheet} />
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default Library;
