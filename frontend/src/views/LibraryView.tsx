import { Divider, Stack, Typography } from '@mui/material';
import { fetchWorksheetsByInstructor } from '../helper/worksheetFetch';
import { useContext, useEffect, useRef, useState } from 'react';
import { Worksheet } from '../config/worksheetType';
import ViewHeader from '../components/layout/ViewHeader';
import { AlertContext } from '../App';

import LibraryCards from '../components/layout/LibraryCards';
import LibraryGroups from '../components/layout/LibraryGroups';
import LibraryHeader from '../components/layout/LibraryHeader';

const Library = () => {
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
					limit: 30,
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
			<ViewHeader text="Library" />
			<Divider />
			<LibraryHeader />
			<Divider />
			<Stack spacing={1}>
				<LibraryGroups headerText="Recent" />
				<LibraryCards worksheets={worksheets.slice(0, 6)} />
			</Stack>
			<Divider />
			<Stack spacing={0.5} alignItems='center'>
				<Typography variant='subtitle1' color='text.secondary'>You have created {totalCount} total worksheets</Typography>
				<LibraryCards headerText="More" worksheets={worksheets.slice(6)} />
			</Stack>
		</Stack>
	);
};

export default Library;
