import { Stack, TextField, Grid, Button } from '@mui/material';
import CreateSelect from '../../inputs/select/CreateSelect';
import { newWorksheet } from '../../../config/worksheetType';
import { WORKSHEET_VALUES } from '../../../config/worksheetData';
import { SkillDescription } from '../../../config/levelSkillDescriptions';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import AddToGroupModal from '../../modals/AddToGroupModal';
import { useState } from 'react';
import { useUser } from '../../hooks/useUser';

interface WorksheetHeaderInputsProps {
	values: newWorksheet;
	selectedGroups: { id: string; name: string }[];
	setSelectedGroups: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>;
	setHeader: React.Dispatch<React.SetStateAction<newWorksheet>>;
	setSkills: React.Dispatch<React.SetStateAction<SkillDescription>>;
	errors: { [key: string]: string };
	disabled?: boolean;
}

const WorksheetHeaderInputs = ({
	values,
	selectedGroups,
	setSelectedGroups,
	setHeader,
	setSkills,
	errors,
	disabled = false,
}: WorksheetHeaderInputsProps) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { user } = useUser();

	const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newLevel = parseInt(event.target.value);
		const newSkills = WORKSHEET_VALUES.levels.descriptions[newLevel];

		setSkills(newSkills);
		setHeader((prevValues) => ({
			...prevValues,
			level: newLevel,
			students:
				prevValues.students.length > 0
					? prevValues.students.map((student) => ({
							...student,
							skills: Array(newSkills.length).fill(false),
					  }))
					: [
							{
								name: '',
								skills: Array(newSkills.length).fill(false),
								passed: false,
							},
					  ],
		}));
	};

	const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name in values) {
			setHeader((prevValues) => ({
				...prevValues,
				[name]: value,
			}));
		}
	};

	return (
		<Stack>
			<Stack direction="row" spacing={1}>
				<TextField
					disabled
					label="Instructor"
					defaultValue={
						typeof values.instructor === 'string'
							? values.instructor
							: values.instructor.name
					}
					InputProps={{
						readOnly: true,
					}}
					sx={{ width: '150%' }}
					error={!!errors.instructor}
					helperText={errors.instructor ? errors.instructor : ' '}
				/>

				<Button
					disabled={disabled}
					variant="outlined"
					startIcon={<CreateNewFolderIcon />}
					fullWidth
					sx={{ height: '56px' }}
					onClick={() => setModalOpen(true)}
				>
					Add to Group
				</Button>
				<AddToGroupModal
					selectedGroups={selectedGroups}
					setSelectedGroups={setSelectedGroups}
					open={modalOpen}
					setOpen={setModalOpen}
					instructorId={user.id}
				/>
			</Stack>
			<Stack direction="row" spacing={1}>
				<CreateSelect
					disabled={disabled}
					label="level"
					value={values.level}
					menuItems={WORKSHEET_VALUES.levels.names}
					error={errors.level}
					handleChange={handleLevelChange}
				/>
				<CreateSelect
					disabled={disabled}
					label="session"
					value={values.session}
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
						value={values.year || ''}
						error={!!errors.year}
						helperText={errors.year}
						onChange={handleHeaderChange}
					/>
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<CreateSelect
						disabled={disabled}
						label="day"
						value={values.day}
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
						value={values.time}
						error={!!errors.time}
						helperText={errors.time}
						onChange={handleHeaderChange}
					/>
				</Grid>
				<Grid item xs={6} md={3} p={0.5}>
					<CreateSelect
						disabled={disabled}
						label="location"
						value={values.location}
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
