import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Worksheet } from '../config/worksheetType';
import { fetchWorksheetById } from '../helper/worksheetFetch';
import BackButton from '../components/inputs/BackButton';
import CreateView from './CreateView';
import { Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { deleteWorksheetById } from '../helper/delete';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../components/navigation/DeleteModal';

interface WorksheetInspectViewProps {
	backText: string;
	to: string;
}

const WorksheetInspectView = ({ backText, to }: WorksheetInspectViewProps) => {
	const { worksheetId } = useParams();
	const [worksheet, setWorksheet] = useState<Worksheet>();
	const [editing, setEditing] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [resetKey, setResetKey] = useState<number>(0);
	const navigate = useNavigate();

	useEffect(() => {
		const getWorksheet = async () => {
			try {
				if (!worksheetId) return;
				const data: Worksheet = await fetchWorksheetById(worksheetId);
				setWorksheet(data);
			} catch (error) {
				console.log('Failed to fetch worksheet');
			}
		};

		getWorksheet();
	}, [worksheetId]);

	const handleDelete = async () => {
		if (!worksheetId) return;

		try {
			setLoading(true);
			await deleteWorksheetById(worksheetId);
		} catch (error) {
			setLoading(false);
			console.log('Error deleting');
		} finally {
			setModalOpen(false);
			setLoading(false);
			console.log('Success deleting');
			navigate('/library');
		}
	};

	const handleEditChange = () => {
		const isEditing = !editing;

		setEditing(isEditing);
		if (!isEditing) {
			setResetKey(resetKey === 0 ? resetKey + 1 : resetKey - 1);
		}
	};

	return (
		<Stack width="100%" spacing={1.5}>
			<DeleteModal
				open={modalOpen}
				headerText="Are you sure you want to delete?"
				loading={loading}
				onCancel={() => setModalOpen(false)}
				handleDelete={handleDelete}
			/>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<BackButton name={backText} to={to} />

				<Stack direction="row" spacing={1}>
					<Button
						color="primary"
						variant="outlined"
						onClick={handleEditChange}
						startIcon={editing && <DoNotDisturbIcon />}
					>
						{!editing ? <EditIcon /> : 'Cancel'}
					</Button>
					<Button
						color="primary"
						variant="outlined"
						onClick={() => setModalOpen(true)}
					>
						<DeleteIcon />
					</Button>
				</Stack>
			</Stack>

			{worksheet && (
				<CreateView
					key={resetKey}
					worksheetId={worksheet._id}
					defaultValues={worksheet}
					disabled={!editing}
				/>
			)}
		</Stack>
	);
};

export default WorksheetInspectView;
