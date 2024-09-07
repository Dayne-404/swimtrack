import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import LoadingButton from './LoadingButton';

interface WorksheetFooterInputs {
	loading: boolean;
	disabled?: boolean;
	addStudent: () => void;
	submit: () => void;
}

const WorksheetFooterInputs = ({
	disabled = false,
	loading,
	addStudent,
	submit,
}: WorksheetFooterInputs) => {
	return (
		<Grid
			container
			alignItems="center"
			justifyContent="space-between"
			rowSpacing={1}
		>
			<Grid item xs={12} md={2}>
				<Button
					disabled={disabled}
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
					disabled={disabled}
					loading={loading}
				/>
			</Grid>
		</Grid>
	);
};

export default WorksheetFooterInputs;
