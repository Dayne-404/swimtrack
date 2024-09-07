import LoadingButton from '../inputs/LoadingButton';
import InfoModal from '../layout/InfoModal';
import { Stack, Button } from '@mui/material';

interface DeleteModalProps {
	open: boolean;
	headerText: string;
	loading: boolean;
	onCancel: () => void;
	handleDelete: () => void;
}

const DeleteModal = ({
	open,
	headerText,
	loading,
	onCancel,
	handleDelete,
}: DeleteModalProps) => {
	return (
		<InfoModal
			open={open}
			headerText={headerText}
			body={
				<Stack pt={3} direction="row" spacing={2}>
					<Button
						fullWidth
						variant="outlined"
						onClick={onCancel}
					>
						Cancel
					</Button>
					<LoadingButton
						loading={loading}
						text="Delete Forever"
						color="error"
						onClick={handleDelete}
					/>
				</Stack>
			}
		/>
	);
};

export default DeleteModal;
