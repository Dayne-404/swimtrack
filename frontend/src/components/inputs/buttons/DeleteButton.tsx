import { Button } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../../modals/DeleteModal';

interface DeleteButtonProps {
	loading?: boolean;
	innerModal?: React.ReactElement;
	buttonText?: string;
	headerText?: string;
	handleDelete: () => void;
}

const DeleteButton = ({
	handleDelete,
	loading,
	headerText,
	innerModal,
	buttonText,
}: DeleteButtonProps) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<>
			<DeleteModal
				open={modalOpen}
				setOpen={setModalOpen}
				innerModal={innerModal}
				headerText={headerText}
				loading={loading}
				onCancel={() => setModalOpen(false)}
				handleDelete={handleDelete}
			/>
			<Button
				color="primary"
				variant="outlined"
				onClick={() => setModalOpen(true)}
				endIcon={buttonText && <DeleteIcon />}
			>
				{buttonText}
				{!buttonText && <DeleteIcon />}
			</Button>
		</>
	);
};

export default DeleteButton;
