import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

interface WorksheetFooterInputs {
	addStudent: () => void;
	submit: () => void;
}

const WorksheetFooterInputs = ({
	addStudent,
	submit,
}: WorksheetFooterInputs) => {
	return (
		<Grid container alignItems="center"  justifyContent='space-between' rowSpacing={1}>
			<Grid item xs={12} md={2}>
				<Button
					variant="contained"
					onClick={addStudent}
					startIcon={<AddIcon />}
					fullWidth
				>
					Add Student
				</Button>
			</Grid>
			<Grid item xs={12} md={1}>
				

				<Button
					variant="outlined"
					startIcon={<CheckIcon />}
					onClick={submit}
					fullWidth
				>
					Submit
				</Button>
				
			</Grid>
		</Grid>
	);
};

export default WorksheetFooterInputs;
