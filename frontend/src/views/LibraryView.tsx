import { Divider, Grid, Stack, Box, Typography } from '@mui/material';
import { fetchWorksheetsByInstructor } from '../helper/worksheetFetch';
import { useContext, useEffect, useRef, useState } from 'react';
import WorksheetCard from '../components/cards/WorksheetCard';
import { Worksheet } from '../config/worksheetType';
import ViewHeader from '../components/layout/ViewHeader';
import { AlertContext } from '../App';
import Loading from '../components/layout/Loading';

const Library = () => {
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const showAlert = useContext(AlertContext);
	const showAlertRef = useRef(showAlert);

	useEffect(() => {
		const getWorksheets = async () => {
			try {
				const data: Worksheet[] = await fetchWorksheetsByInstructor(
					'66e083d5e781e4ee0b2602e7'
				);
				setWorksheets(data);
				console.log('DATA: ', data);
				setLoading(false);
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: 'An unkown error occurred';

				showAlertRef.current(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		getWorksheets();
	}, []);

	return (
		<>
			{loading || worksheets.length === 0 ? (
				<Loading />
			) : (
				<Stack width='100%' spacing={2}>
					<ViewHeader text="Library" />
					<Divider />
					<Box width='100%'>
						<Typography variant='h6'>Your Worksheets</Typography>
						<Grid container spacing={1}>
							{worksheets.map((worksheet) => (
								<Grid item xs={12} sm={6} md={2} key={worksheet._id}>
									<WorksheetCard worksheet={worksheet} />
								</Grid>
							))}
						</Grid>
					</Box>
				</Stack>
			)}
		</>
	);
};

export default Library;
