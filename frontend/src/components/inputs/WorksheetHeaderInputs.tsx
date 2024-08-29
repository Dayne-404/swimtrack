import { Stack, TextField, Grid } from '@mui/material';
import CreateSelect from './CreateSelect';
import { WORKSHEETS } from '../../config/levels';

interface WorksheetHeaderInputs {
	worksheetHeaderValues: {
		instructor: string;
		level: string;
		session: string;
		year: string;
		day: string;
		time: string;
		location: string;
	};
	errors: { [key: string]: string };
	handleLevelChange: (newLevel: string) => void;
	handleHeaderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WorksheetHeaderInputs = ({
	worksheetHeaderValues,
	errors,
	handleLevelChange,
	handleHeaderChange,
}: WorksheetHeaderInputs) => {
	return (
		<Stack>
			<Stack direction='row' spacing={1}>
				<TextField
					disabled
					label="Instructor"
					defaultValue={worksheetHeaderValues.instructor}
					InputProps={{
						readOnly: true,
					}}
					sx={{width: '150%'}}
					error={!!errors.instructor}
					helperText={errors.instructor ? errors.instructor : ' '}
				/>
				<CreateSelect
					label="Group"
					name="group"
					menuItems={['RandomGroup1', 'RandomGroup2']}
					error={errors.level}
				/>
			</Stack>
			<Stack direction="row" spacing={1}>
				<CreateSelect
					label="Level"
					name="level"
					menuItems={WORKSHEETS.levels}
					value={worksheetHeaderValues.level}
					error={errors.level}
					handleChange={(e) => handleLevelChange(e.target.value)}
				/>
				<CreateSelect
					label="Session"
					name="session"
					menuItems={WORKSHEETS.sessions}
					value={worksheetHeaderValues.session}
					error={errors.session}
					handleChange={handleHeaderChange}
				/>
			</Stack>
			<Grid container>
				<Grid item xs={6} md={3} p={0.5}>
					<TextField
						fullWidth
						label="Year"
						name="year"
						value={worksheetHeaderValues.year}
						error={!!errors.year}
						helperText={errors.year}
						onChange={handleHeaderChange}
					/>
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<CreateSelect
						label="Day"
						name="day"
						menuItems={WORKSHEETS.days}
						value={worksheetHeaderValues.day}
						error={errors.day}
						handleChange={handleHeaderChange}
					/>
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<TextField
						fullWidth
						label="Time"
						name="time"
						value={worksheetHeaderValues.time}
						error={!!errors.time}
						helperText={errors.time}
						onChange={handleHeaderChange}
					/>
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<CreateSelect
						label="Location"
						name="location"
						menuItems={WORKSHEETS.locations}
						value={worksheetHeaderValues.location}
						error={errors.location}
						handleChange={handleHeaderChange}
					/>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default WorksheetHeaderInputs;
