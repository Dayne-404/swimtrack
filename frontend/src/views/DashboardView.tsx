import { Divider, Stack, Typography, Box } from '@mui/material';
import { fetchWorksheetsByInstructor } from '../helper/worksheetFetch';
import { useContext, useEffect, useRef, useState } from 'react';
import { Worksheet } from '../config/worksheetType';
import ViewHeader from '../components/layout/ViewHeader';
import { AlertContext } from '../App';

import LibraryCards from '../components/layout/LibraryCards';
import LibraryGroups from '../components/layout/LibraryGroups';
import LibraryHeader from '../components/layout/LibraryHeader';

const DashboardView = () => {
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const showAlert = useContext(AlertContext);
	const showAlertRef = useRef(showAlert);

	useEffect(() => {
		const getWorksheets = async () => {
			setLoading(true);
			try {
				const data = await fetchWorksheetsByInstructor({
					instructor: '66e083d5e781e4ee0b2602e7',
					limit: 6,
					sorting: '-updatedAt',
				});
				setWorksheets(data.worksheets);
				setTotalCount(data.totalCount);
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
		<Stack width="100%" spacing={2}>
			<ViewHeader text="Dashboard" />
			<Divider />
			<LibraryHeader />
			<Divider />
			<Stack spacing={1}>
				<LibraryGroups headerText="Recent Groups & Worksheets" />
				<LibraryCards worksheets={worksheets.slice(0, 6)} />
			</Stack>
			<Divider />
			<Box
				width="100%"
				alignItems="center"
				display="flex"
				flexDirection="column"
			>
				<Typography variant="h6" gutterBottom>
					Statistics
				</Typography>
				<Typography> Dayne you have created {totalCount} total worksheets</Typography>
				<Typography> and {totalCount} groups</Typography>
			</Box>
		</Stack>
	);
};

export default DashboardView;
