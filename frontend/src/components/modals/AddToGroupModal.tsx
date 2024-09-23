import { Divider, Stack, Chip } from '@mui/material';
import InfoModal from './InfoModal';
import GroupSearch from '../inputs/search/GroupSearch';
interface AddToGroupModalProps {
	selectedGroups: { id: string; name: string }[];
	setSelectedGroups: React.Dispatch<
		React.SetStateAction<{ id: string; name: string }[]>
	>;
	open?: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	instructorId: string;
}

const AddToGroupModal = ({
	selectedGroups,
	setSelectedGroups,
	open = false,
	setOpen,
	instructorId,
}: AddToGroupModalProps) => {
	const handleGroupSelect = (
		groupId: string | null,
		groupName: string | null
	) => {
		if (groupId && groupName) {
			const previouslySelected = selectedGroups.some(
				(group) => group.id === groupId
			);

			if (!previouslySelected)
				setSelectedGroups((prevGroups) => [
					...prevGroups,
					{ id: groupId, name: groupName },
				]);
		}
	};

	const handleDelete = (id: string) => {
		setSelectedGroups((prevGroups) =>
			prevGroups.filter((group) => group.id !== id)
		);
	};

	return (
		<InfoModal
			open={open}
			setOpen={setOpen}
			headerText="Add to Group"
			body={
				<Stack width="100%" height="50vh" spacing={2} pt={2}>
					<GroupSearch
						label="Search for group"
						instructorId={instructorId}
						handleGroupChange={handleGroupSelect}
						size='medium'
					/>
					<Divider />
					<Stack direction="row" spacing={1} flexWrap="wrap">
						{selectedGroups.map((group) => (
							<Chip
								key={group.id}
								color="primary"
								label={group.name}
								onDelete={() => handleDelete(group.id)}
							/>
						))}
					</Stack>
				</Stack>
			}
		/>
	);
};

export default AddToGroupModal;
