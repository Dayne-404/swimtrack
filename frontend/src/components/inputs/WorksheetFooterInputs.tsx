import { Stack, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

interface WorksheetFooterInputs {
    addStudent: () => void;
}

const WorksheetFooterInputs = ({addStudent} : WorksheetFooterInputs) => {
	return (
		<Stack direction="row" justifyContent="space-between" spacing={2}>
			<Button
				variant="contained"
				onClick={addStudent}
				startIcon={<AddIcon />}
			>
				Add Student
			</Button>
			<Stack direction="row" spacing={2}>
				<TextField
					select
					size="small"
					id="group-select"
					label="Group"
					sx={{ width: '10rem' }}
				/>
				<Button variant="outlined" startIcon={<CheckIcon />}>
					Submit
				</Button>
			</Stack>
		</Stack>
	);
};

export default WorksheetFooterInputs;
