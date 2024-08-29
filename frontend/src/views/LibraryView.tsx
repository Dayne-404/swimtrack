import { Stack, CircularProgress } from '@mui/material';
import View from '../components/layout/View';
import { fetchWorksheetsByInstructor } from '../helper/fetch';
import { useEffect, useState } from 'react';
import WorksheetCard from '../components/cards/WorksheetCard';
import { Worksheet } from '../config/worksheetType';
import capitalizeFirstLetter from '../helper/capitalizeFirstLetter';
import formatDate from '../helper/formatDate';
import { LEVELS } from '../config/levels';

const Library = () => {
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>('');

	useEffect(() => {
		const getWorksheets = async () => {
			try {
				const data: Worksheet[] = await fetchWorksheetsByInstructor(
					'Dayne'
				);
				setWorksheets(data);
			} catch (error) {
				setError('Failed to fetch worksheets');
			} finally {
				setLoading(false);
			}
		};

		getWorksheets();
	}, []);

	{
		console.log(worksheets);
	}

	return (
		<View
			headerText="Library"
			body={
				loading ? (
					<CircularProgress />
				) : (
					<Stack direction="column">
						{worksheets.map((worksheet) => (
							<WorksheetCard
								key={worksheet._id}
								level={LEVELS[worksheet.level].name}
								session={capitalizeFirstLetter(
									worksheet.session
								)}
								day={capitalizeFirstLetter(worksheet.day)}
								time={capitalizeFirstLetter(worksheet.time)}
								year={capitalizeFirstLetter(worksheet.year)}
								createdOn={formatDate(worksheet.createdAt)}
							/>
						))}
					</Stack>
				)
			}
		/>
	);
};

export default Library;
