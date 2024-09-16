import { Stack, TextField, Grid } from '@mui/material';
import CreateSelect from './CreateSelect';
import { newWorksheet } from '../../config/worksheetType';
import { WORKSHEET_VALUES } from '../../config/worksheetData';
import GroupSearch from './GroupSearch';

interface WorksheetHeaderInputsProps {
	worksheetHeader: newWorksheet;
	errors: { [key: string]: string };
	disabled?: boolean;
	handleGroupChange: (e: string | null) => void;
	handleLevelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleHeaderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WorksheetHeaderInputs = ({
	worksheetHeader,
	errors,
	handleGroupChange,
	handleLevelChange,
	handleHeaderChange,
	disabled = false,
}: WorksheetHeaderInputsProps) => {
	
	return (
		<Stack>
			<Stack direction="row" spacing={1}>
				<TextField
					disabled
					label="Instructor"
					defaultValue={
						typeof worksheetHeader.instructor === 'string'
							? worksheetHeader.instructor
							: worksheetHeader.instructor.name
					}
					InputProps={{
						readOnly: true,
					}}
					sx={{ width: '150%' }}
					error={!!errors.instructor}
					helperText={errors.instructor ? errors.instructor : ' '}
				/>
				
				<GroupSearch instructorId='66e083d5e781e4ee0b2602e7' handleGroupChange={handleGroupChange} />

			</Stack>
			<Stack direction="row" spacing={1}>
				<CreateSelect
					disabled={disabled}
					label="level"
					value={worksheetHeader.level}
					menuItems={WORKSHEET_VALUES.levels.names}
					error={errors.level}
					handleChange={handleLevelChange}
				/>
				<CreateSelect
					disabled={disabled}
					label="session"
					value={worksheetHeader.session}
					menuItems={WORKSHEET_VALUES.sessions}
					error={errors.session}
					handleChange={handleHeaderChange}
				/>
			</Stack>
			<Grid container>
				<Grid item xs={6} md={3} p={0.5}>
					<TextField
						disabled={disabled}
						fullWidth
						label="Year"
						name="year"
						type="number"
						value={worksheetHeader.year || ''}
						error={!!errors.year}
						helperText={errors.year}
						onChange={handleHeaderChange}
					/>
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<CreateSelect
						disabled={disabled}
						label="day"
						value={worksheetHeader.day}
						menuItems={WORKSHEET_VALUES.days}
						error={errors.day}
						handleChange={handleHeaderChange}
					/>
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<TextField
						disabled={disabled}
						fullWidth
						label="Time"
						name="time"
						value={worksheetHeader.time}
						error={!!errors.time}
						helperText={errors.time}
						onChange={handleHeaderChange}
					/>
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<CreateSelect
						disabled={disabled}
						label="location"
						value={worksheetHeader.location}
						menuItems={WORKSHEET_VALUES.locations}
						error={errors.location}
						handleChange={handleHeaderChange}
					/>
				</Grid>
			</Grid>
		</Stack>
	);
};

export default WorksheetHeaderInputs;
