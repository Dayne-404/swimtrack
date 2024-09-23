import { useNavigate, useParams } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import BackButton from '../components/inputs/buttons/BackButton';
import { useContext, useEffect, useRef, useState } from 'react';
import { fetchGroupById } from '../helper/groupFetch';
import { Worksheet } from '../config/worksheetType';
import { FetchedGroup } from '../config/groupType';
import WorksheetGrid from '../components/layout/grids/WorksheetGrid';
import { AlertContext } from '../App';
import DeleteButton from '../components/inputs/buttons/DeleteButton';
import { deleteGroupById } from '../helper/delete';
import RemoveIcon from '@mui/icons-material/Remove';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { removeWorksheetFromGroup } from '../helper/put';

const GroupInspectView = () => {
	const { groupId } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState<string>('');
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [isRemoving, setIsRemoving] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const showAlert = useContext(AlertContext);
	const showAlertRef = useRef(showAlert);

	useEffect(() => {
		const getWorksheets = async () => {
			setLoading(true);
			try {
				if (!groupId) throw new Error('Missing group Id');

				const data: FetchedGroup = await fetchGroupById({
					groupId: groupId,
				});

				setName(data.name);
				setWorksheets(data.worksheets);
				setLoading(false);
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: 'An unkown error occurred';
				showAlertRef.current(errorMessage);
				setLoading(false);
				navigate('/groups');
			}
		};

		getWorksheets();
	}, [groupId, navigate]);

	const handleDelete = async () => {
		if (!groupId) return;

		setLoading(true);
		try {
			deleteGroupById(groupId);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'An unkown error occurred';
			showAlertRef.current(`Error deleting ${name}, ${errorMessage}`);
		} finally {
			setLoading(false);
			showAlertRef.current(`Sucessfully deleted ${name}`, 'success');
			navigate('/groups');
		}
	};

	const handleRemoveToggle = async () => {
		if (isRemoving) {
			setIsRemoving(false);

			if(!groupId)
				return;

			setLoading(true);
			try {
				removeWorksheetFromGroup(groupId, selected);

				const newWorksheets = worksheets.filter(worksheet => !selected.includes(worksheet._id));
				setWorksheets(newWorksheets);
			} catch (error) {
				const errorMessage =
				error instanceof Error
					? error.message
					: 'An unkown error occurred';
				showAlertRef.current(`Error removing worksheets, ${errorMessage}`);
			} finally {
				setLoading(false);
				showAlertRef.current(`Sucessfully removed ${selected.length} worksheets from ${name}`, 'success');
			}
		} else {
			setIsRemoving(true);
		} 

		setSelected([]);
	};

	return (
		<Stack spacing={1} width="100%">
			<Box>
				<BackButton name="Back" to="/groups" />
			</Box>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Stack direction="row" spacing={1} alignItems="center">
					<FolderOpenIcon fontSize="large" />
					<Typography variant="h6">{name}</Typography>
				</Stack>
				<Stack direction="row" spacing={1}>
					<ButtonGroup variant="outlined">
						{isRemoving && (
							<Button
								endIcon={<CancelIcon />}
								onClick={() => {
									setIsRemoving(false);
									setSelected([]);
								}}
							>
								Cancel
							</Button>
						)}
						<Button
							onClick={() => handleRemoveToggle()}
							endIcon={
								isRemoving ? <CheckIcon /> : <RemoveIcon />
							}
						>
							{isRemoving ? 'Submit' : 'Remove'}
						</Button>
					</ButtonGroup>
					<DeleteButton
						handleDelete={handleDelete}
						loading={loading}
						headerText={`Are you sure you want to delete ${name}`}
						buttonText="Delete"
					/>
				</Stack>
			</Stack>
			<Divider />
			<WorksheetGrid
				worksheets={worksheets}
				loading={loading}
				selectable={{canSelect: isRemoving, selected, setSelected}}
			/>
		</Stack>
	);
};

export default GroupInspectView;
