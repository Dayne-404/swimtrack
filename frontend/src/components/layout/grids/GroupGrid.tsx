import { Grid, Typography, Box, Pagination, Stack } from '@mui/material';
import GroupCard from '../../cards/GroupCard';
import { useEffect, useState } from 'react';
import { Group } from '../../../config/groupType';
import { fetchGroupsByInstructor, FetchGroupsResponse } from '../../../helper/groupGetRequests';
import Loading from '../main/Loading';
import { useUser } from '../../hooks/useUser';

const DEFAULT_LIMIT = 20;

interface GroupGridProps {
	limit?: number;
	displayNumGroups?: boolean;
	sortOption?: number;
	singlePage?: boolean;
}

const GroupGrid = ({
	limit = DEFAULT_LIMIT,
	displayNumGroups = true,
	singlePage = false,
	sortOption,
}: GroupGridProps) => {
	const [groups, setGroups] = useState<Group[]>([]);
	const [totalGroups, setTotalGroups] = useState<number>(0);
	const [skip, setSkip] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const { user } = useUser();

	useEffect(() => {
		const getWorksheets = async () => {
			setLoading(true);
			try {
				const data: FetchGroupsResponse = await fetchGroupsByInstructor({
					instructorId: user.id,
					sorting: { updatedAt: 1 },
					limit: limit,
					skip: skip,
				});

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
	}, [sortOption, limit, user.id, skip]);

	if (loading) return <Loading />;

	return (
		<>
			{totalGroups === 0 && displayNumGroups && (
				<Box textAlign="center" py={3}>
					<Typography variant="h5">No Groups Found</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						Have you tried making one?
					</Typography>
				</Box>
			)}

			<Grid container spacing={1}>
				{groups.map((group) => (
					<GroupCard key={group._id} id={group._id} groupName={group.name} />
				))}
			</Grid>
			<Stack>
				{totalGroups > DEFAULT_LIMIT && !singlePage && (
					<Pagination
						count={Math.ceil(totalGroups / limit)}
						page={Math.floor(skip / limit) + 1}
						onChange={(_e, value) => setSkip((value - 1) * limit)}
						color="primary"
						variant="outlined"
						sx={{ alignSelf: 'center', mt: 2 }}
					/>
				)}
			</Stack>
		</>
	);
};

export default GroupGrid;
