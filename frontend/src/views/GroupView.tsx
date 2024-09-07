import { Grid, Box, Button, Stack, Divider } from '@mui/material';
import { GROUPS } from '../config/groupsPLACEHOLDER';
import GroupCard from '../components/cards/GroupCard';
import View from '../components/layout/View';
import SearchBar from '../components/inputs/SearchBar';
import SortSelect from '../components/inputs/SortSelect';

interface Group {
	id: string;
	name: string;
	worksheets: string[];
}

const GroupView = () => {
	const groups: Group[] = GROUPS;
	const displayedGroups = groups.slice(0, 7);

	return (
		<View
			headerText="Groups"
			maxHeight={80}
			body={
				<Box sx={{ width: '100%', overflowY: 'auto' }}>
					<Stack direction='row' spacing={1}>
                        <SearchBar size='small' width='100%' />
                        <SortSelect menuItems={['Recent', 'Newest', 'Oldest']} />
                    </Stack>
                    <Divider sx={{my: 1.5}}  />
                    <Grid container spacing={1}>
						<GroupCard newFolder key={'new-folder-btn'} />
						{displayedGroups.map((group) => (
							<GroupCard
								id={group.id}
								key={group.id}
								groupName={group.name}
							/>
						))}
					</Grid>
					{groups.length >= 8 ? (
						<Stack pt={1.5} alignItems="center">
							<Button>View all</Button>
						</Stack>
					) : (
						<></>
					)}
				</Box>
			}
		/>
	);
};

export default GroupView;
