import { useNavigate, useParams } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box, Divider, Stack, Typography } from '@mui/material';
import BackButton from '../components/inputs/BackButton';
import { useContext, useEffect, useRef, useState } from 'react';
import { fetchGroupById } from '../helper/groupFetch';
import { Worksheet } from '../config/worksheetType';
import { FetchedGroup } from '../config/groupType';
import WorksheetGrid from '../components/layout/WorksheetGrid';
import { AlertContext } from '../App';

const GroupInspectView = () => {
	const { groupId } = useParams();
	const navigate = useNavigate();

	const [name, setName] = useState<string>('');
	const [worksheets, setWorksheets] = useState<Worksheet[]>([]);
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

	return (
		<Stack spacing={1} width="100%">
			<Box>
				<BackButton name="Back" to="/groups" />
			</Box>
			<Stack direction="row" spacing={1} alignItems="center">
				<FolderOpenIcon fontSize="large" />
				<Typography variant="h6">{name}</Typography>
			</Stack>
			<Divider />
			<WorksheetGrid worksheets={worksheets} loading={loading} />
		</Stack>
	);
};

export default GroupInspectView;
