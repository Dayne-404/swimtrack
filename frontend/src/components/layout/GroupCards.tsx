import { Grid, Typography, Box } from '@mui/material';
import GroupCard from '../cards/GroupCard';
import { useEffect, useState } from 'react';
import { Group } from '../../config/groupType';
import {
	fetchGroupsByInstructor,
	FetchGroupsResponse,
} from '../../helper/groupFetch';
import Loading from './Loading';

const GroupCards = () => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [totalGroups, setTotalGroups] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const getWorksheets = async () => {
			setLoading(true);
			try {
				const data: FetchGroupsResponse = await fetchGroupsByInstructor(
					{ instructorId: '66e083d5e781e4ee0b2602e7' }
				);

				setGroups(data.groups);
				setTotalGroups(data.totalCount);
				setLoading(false);
			} catch (error) {
				// const errorMessage =
				// 	error instanceof Error
				// 		? error.message
				// 		: 'An unkown error occurred';
				// showAlertRef.current(errorMessage);
			} finally {
				setLoading(false);
			}
		};

		getWorksheets();
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					{totalGroups === 0 && (
						<Box textAlign="center" py={3}>
							<Typography variant="h5">
								No Groups Found
							</Typography>
							<Typography
								variant="subtitle1"
								color="text.secondary"
							>
								Have you tried making one?
							</Typography>
						</Box>
					)}
					<Grid container spacing={1}>
						<Grid item xs={12} pb={0.5} textAlign="center">
							{groups.length > 0 && (
								<Typography
									variant="subtitle1"
									color="text.secondary"
								>
									Showing {groups.length} groups out of |{' '}
									{totalGroups}
								</Typography>
							)}
						</Grid>

						{groups.map((group) => (
							<GroupCard
								key={group._id}
								id={group._id}
								groupName={group.name}
							/>
						))}
					</Grid>
				</>
			)}
		</>
	);
};

export default GroupCards;
