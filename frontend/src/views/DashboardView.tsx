import { Divider, Stack, Typography, Box } from '@mui/material';
import { fetchWorksheetsByInstructor } from '../helper/worksheetFetch';
import { useContext, useEffect, useRef, useState } from 'react';
import { Worksheet } from '../config/worksheetType';
import ViewHeader from '../components/layout/main/ViewHeader';
import { AlertContext } from '../App';

import GroupGrid from '../components/layout/grids/GroupGrid';
import DashboardHeader from '../components/layout/DashboardHeader';
import { useUser } from '../components/hooks/useUser';
import WorksheetGrid from '../components/layout/grids/WorksheetGrid';

const DashboardView = () => {
	const { user } = useUser();
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
					instructor: user.id,
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
	}, [user.id]);

	return (
		<Stack width="100%" spacing={2}>
			<ViewHeader text="Dashboard" />
			<Divider />
			<DashboardHeader />
			<Divider />
			<Stack spacing={1} alignItems="center">
				<Typography variant="h6" gutterBottom>
					Recent Groups & Worksheets
				</Typography>
				<GroupGrid limit={4} displayNumGroups={false} />
				<WorksheetGrid
					worksheets={worksheets.slice(0, 6)}
					includeInstructor={false}
					gridSpace={4}
					loading={loading}
				/>
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
				<Typography>
					{user.name} you have created {totalCount} total worksheets
				</Typography>
				<Typography> and {totalCount} groups</Typography>
			</Box>
		</Stack>
	);
};

export default DashboardView;
