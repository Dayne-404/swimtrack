import { Grid, Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

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
				<Button
					variant='outlined'
					startIcon={<CheckIcon />}
					onClick={submit}
					fullWidth
					disabled={loading || disabled}
				>
					submit
				</Button>
				{loading && (
					<CircularProgress
						size={24}
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: '-7px',
							marginLeft: '-12px',
						}}
					/>
				)}
			</Grid>
		</Grid>
	);
};

export default WorksheetFooterInputs;
