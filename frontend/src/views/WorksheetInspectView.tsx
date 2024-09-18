import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Worksheet } from '../config/worksheetType';
import { fetchWorksheetById } from '../helper/worksheetFetch';
import BackButton from '../components/inputs/BackButton';
import CreateView from './CreateView';
import { Button, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { deleteWorksheetById } from '../helper/delete';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../components/inputs/DeleteButton';
import { WORKSHEET_LEVELS } from '../config/worksheetData';
import { AlertContext } from '../App';

interface WorksheetInspectViewProps {
	backText: string;
	to: string;
}

const WorksheetInspectView = ({ backText, to }: WorksheetInspectViewProps) => {
	const { worksheetId } = useParams();
	const [worksheet, setWorksheet] = useState<Worksheet>();
	const [editing, setEditing] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [resetKey, setResetKey] = useState<number>(0);
	const navigate = useNavigate();
	const showAlert = useContext(AlertContext);
	const showAlertRef = useRef(showAlert);

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
			const errorMessage =
				error instanceof Error
					? error.message
					: 'An unkown error occurred';
			showAlertRef.current(
				`Error deleting the group: ${errorMessage}`,
				'error'
			);
		} finally {
			setLoading(false);
			showAlertRef.current('Sucessfully deleted worksheet', 'success');
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

					<DeleteButton
						loading={loading}
						handleDelete={handleDelete}
						innerModal={
							<Typography>
								You will be deleting this{' '}
								{worksheet?.level || worksheet?.level === 0
									? WORKSHEET_LEVELS.names[worksheet.level]
									: 'undefined'}{' '}
								worksheet with {worksheet?.students.length}{' '}
								student{'(s)'}
							</Typography>
						}
					/>
				</Stack>
			</Stack>

			{worksheet && (
				<CreateView
					key={resetKey}
					worksheetId={worksheet._id}
					defaultValues={worksheet}
					disabled={!editing}
					setDisabled={setEditing}
				/>
			)}
		</Stack>
	);
};

export default WorksheetInspectView;
