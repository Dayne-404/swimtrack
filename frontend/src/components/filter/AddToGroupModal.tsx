import { Divider, Stack } from '@mui/material';
import InfoModal from '../layout/InfoModal';
import GroupSearch from '../inputs/GroupSearch';

interface AddToGroupModalProps {
	instructorId: string;
	handleGroupChange: (e: string | null) => void;
}

const AddToGroupModal = ({
	instructorId,
	handleGroupChange,
}: AddToGroupModalProps) => {
	return (
		<InfoModal
			headerText="Add to Group"
			body={
				<Stack width="100%" height="50vh" spacing={2} pt={2}>
					<GroupSearch
						label="Search for group"
						instructorId={instructorId}
						handleGroupChange={handleGroupChange}
					/>
					<Divider />
					<Stack direction="row" spacing={1} flexWrap="wrap"></Stack>
				</Stack>
			}
		/>
	);
};

export default AddToGroupModal;
