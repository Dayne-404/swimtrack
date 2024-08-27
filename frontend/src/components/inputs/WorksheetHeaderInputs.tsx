import { TextField, Stack, Grid } from '@mui/material';
import CreateSelect from './CreateSelect';
import { getLevels } from '../../config/filters';

interface WorksheetHeaderInputsProps {
  level: string;
  handleLevelChange: (level: string) => void;
}

const WorksheetHeaderInputs = ({level, handleLevelChange} : WorksheetHeaderInputsProps) => {
	const levels = getLevels();
  
  return (
		<Stack spacing={2}>
			<TextField
				id="instructor-input"
				label="Instructor"
				defaultValue="Dayne"
				InputProps={{
					readOnly: true,
				}}
			/>
			<Stack direction="row" spacing={2}>
				<CreateSelect
          label='Level'
          menuItems={levels}
          value={level}
          handleChange={handleLevelChange}
        />
				<TextField
					fullWidth
					id="session-select"
					select
					label="Session"
				></TextField>
			</Stack>
			<Grid container>
				<Grid item xs={6} md={3} p={0.5}>
					<TextField fullWidth id="year-select" label="Year" />
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<TextField fullWidth id="day-select" select label="Day" />
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<TextField fullWidth id="time-select" label="Time" />
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<TextField
						fullWidth
						id="location-select"
						select
						label="Location"
					/>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default WorksheetHeaderInputs;
