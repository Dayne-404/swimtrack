import { Stack, TextField, Button } from '@mui/material';
import InfoModal from './InfoModal';
import { useState, useContext } from 'react';
import { createGroup } from '../../helper/submit';
import { Group } from '../../config/groupType';
import { AlertContext } from '../../App';
import { useNavigate } from 'react-router-dom';

interface CreateGroupModalProps {
	instructor: string;
	open?: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupModal = ({
	instructor,
	open = false,
	setOpen,
}: CreateGroupModalProps) => {
	const [groupName, setGroupName] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const showAlert = useContext(AlertContext);
	const navigate = useNavigate();

	const submit = async () => {
		setLoading(true);
		try {
			const data: Group = await createGroup(instructor, groupName);

			if (data._id) {
				showAlert('Sucessfully created group', 'success');
				navigate(`/groups/${data._id}`);
			}
		} catch(error) {
			const errorMesage =
				error instanceof Error
					? error.message
					: 'An unkown error occurred';

			showAlert(errorMesage || '', 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<InfoModal
			open={open}
			setOpen={setOpen}
			headerText="Create Group"
			body={
				<Stack width="100%" spacing={2} pt={2}>
						<TextField
							label="Name"
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
						/>
						<Button variant="outlined" disabled={loading} onClick={submit}>
							{!loading ? 'Submit' : 'Loading'}
						</Button>
					
				</Stack>
			}
		/>
	);
};

export default CreateGroupModal;
