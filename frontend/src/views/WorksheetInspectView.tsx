import { useEffect, useState } from 'react';
import View from '../components/layout/View';
import { useParams } from 'react-router-dom';
import { Worksheet } from '../config/worksheetType';
import { fetchWorksheetById } from '../helper/fetch';
import BackButton from '../components/inputs/BackButton';
import CreateView from './CreateView';
import { Button, CircularProgress, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoModal from '../components/navigation/InfoModal';
import { deleteWorksheetById } from '../helper/delete';
import { useNavigate } from 'react-router-dom';

interface WorksheetInspectViewProps {
	backText: string;
	to: string;
}

const WorksheetInspectView = ({backText, to}: WorksheetInspectViewProps) => {
	const { worksheetId } = useParams();
	const [worksheet, setWorksheet] = useState<Worksheet>();
	const [editing, setEditing] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const getWorksheets = async () => {
			try {
				if (!worksheetId) return;
				const data: Worksheet = await fetchWorksheetById(worksheetId);
				setWorksheet(data);
			} catch (error) {
				console.log('Failed to fetch worksheets');
			}
		};

		getWorksheets();
	}, [worksheetId]);

	const handleDelete = async () => {
		if (!worksheetId) return;

		try {
			setIsLoading(true);
			await deleteWorksheetById(worksheetId);
		} catch (error) {
			setIsLoading(false);
			console.log('Error deleting');
		} finally {
			setModalOpen(false);
			setIsLoading(false);
			console.log('Success deleting');
			navigate('/library');
		}
	};

	return (
		<View
			headerText=""
			body={
				<Stack width="100%" spacing={1.5}>
					<InfoModal
						open={modalOpen}
						headerText="Are you sure you want to delete?"
						body={
							<Stack pt={3} direction="row" spacing={2}>
								<Button
									fullWidth
									variant="outlined"
									onClick={() => setModalOpen(false)}
								>
									Cancel
								</Button>
								<Button
									disabled={isLoading}
									fullWidth
									variant="outlined"
									color="error"
									onClick={handleDelete}
								>
									Delete Forever
								</Button>
								{isLoading && <CircularProgress size="small" />}
							</Stack>
						}
					/>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<BackButton name={backText} to={to} />
						{!editing && (
							<Stack direction="row" spacing={1}>
								<Button
									color="primary"
									variant="outlined"
									onClick={() => setEditing(true)}
								>
									<EditIcon />
								</Button>
								<Button
									color="primary"
									variant="outlined"
									onClick={() => setModalOpen(true)}
								>
									<DeleteIcon />
								</Button>
							</Stack>
						)}
					</Stack>
					{worksheet && (
						<CreateView
							id={worksheet._id}
							headerValues={{
								instructor: worksheet.instructor,
								level: worksheet.level,
								session: worksheet.session,
								year: worksheet.year,
								day: worksheet.day,
								time: worksheet.time,
								location: worksheet.location,
							}}
							defaultStudents={worksheet.students}
							disabled={!editing}
							fullView={false}
						/>
					)}
				</Stack>
			}
		/>
	);
};

export default WorksheetInspectView;
