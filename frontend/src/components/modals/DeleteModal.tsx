import LoadingButton from '../inputs/buttons/LoadingButton';
import InfoModal from './InfoModal';
import { Stack, Button } from '@mui/material';

interface DeleteModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	innerModal?: React.ReactElement;
	headerText?: string;
	loading?: boolean;
	onCancel: () => void;
	handleDelete: () => void;
}

const DeleteModal = ({
	open,
	setOpen,
	innerModal,
	headerText = 'Are you sure you want to delete?',
	loading = false,
	onCancel,
	handleDelete,
}: DeleteModalProps) => {
	return (
		<InfoModal
			open={open}
			setOpen={setOpen}
			headerText={headerText}
			body={
				<Stack pt={2} spacing={2}>
					{innerModal}
					<Stack direction="row" spacing={2}>
						<Button fullWidth variant="outlined" onClick={onCancel}>
							Cancel
						</Button>
						<LoadingButton
							loading={loading}
							text="Delete Forever"
							color="error"
							onClick={handleDelete}
						/>
					</Stack>
				</Stack>
			}
		/>
	);
};

export default DeleteModal;
