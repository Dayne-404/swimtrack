import { Button, Grid, Divider } from '@mui/material';
import SortSelect from '../inputs/select/SortSelect';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useState } from 'react';
import CreateGroupModal from '../modals/CreateGroupModal';
import GroupSearch from '../inputs/search/GroupSearch';

interface GroupHeaderProps {
	instructor: string;
	sortOption: number;
	setSortOption: React.Dispatch<React.SetStateAction<number>>;
}

const GroupHeader = ({
	instructor,
	sortOption,
	setSortOption,
}: GroupHeaderProps) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<>
			<CreateGroupModal
				instructor={instructor}
				open={modalOpen}
				setOpen={setModalOpen}
			/>
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<GroupSearch
						label="Search for group"
						instructorId={instructor}
						size="small"
					/>
				</Grid>
				<Grid item xs={6}>
					<SortSelect
						menuItems={['Recent', 'Oldest']}
						option={sortOption}
						setOption={setSortOption}
					/>
				</Grid>
				<Grid item xs={12} md={3}>
					<Button
						variant="outlined"
						fullWidth
						startIcon={<CreateNewFolderIcon />}
						onClick={() => setModalOpen(true)}
					>
						New Group
					</Button>
				</Grid>
			</Grid>
			<Divider sx={{ my: 1.5 }} />
		</>
	);
};

export default GroupHeader;
