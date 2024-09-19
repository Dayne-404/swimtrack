import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from './LoadingButton';
import { newWorksheet } from '../../config/worksheetType';

interface WorksheetFooterInputs {
	numSkills: number;
	setHeader: React.Dispatch<React.SetStateAction<newWorksheet>>;
	submit: () => void;
	loading?: boolean;
	disabled?: boolean;
}

const WorksheetFooterInputs = ({
	numSkills,
	setHeader,
	submit,
	loading = false,
	disabled = false,
}: WorksheetFooterInputs) => {
	const addStudent = () => {
		const newStudent = {
			name: '',
			skills: Array(numSkills).fill(false),
			passed: false,
		};

		setHeader((prevValues) => ({
			...prevValues,
			students: [...prevValues.students, newStudent],
		}));
	};

	return (
		<Grid
			container
			alignItems="center"
			justifyContent="space-between"
			rowSpacing={1}
		>
			<Grid item xs={12} md={2}>
				<Button
					disabled={disabled || loading}
					variant="contained"
					onClick={addStudent}
					startIcon={<AddIcon />}
					fullWidth
				>
					Add Student
				</Button>
			</Grid>
			<Grid item xs={12} md={1} position="relative">
				<LoadingButton
					text={'submit'}
					onClick={submit}
					startIcon={<CheckIcon />}
					disabled={disabled || loading}
					loading={loading}
				/>
			</Grid>
		</Grid>
	);
};

export default WorksheetFooterInputs;
