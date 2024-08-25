import {
	Box,
	Paper,
	Typography,
	TextField,
	Stack,
	Grid,
	Divider,
	Button,
    IconButton,
} from '@mui/material';
import StudentTable from '../components/StudentTable';
import { useState } from 'react';
import { SWIMMER1SKILLS } from '../config/levels.ts';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface Student {
	name: string;
	skills: boolean[];
	passed: boolean;
}

const Create = () => {
	const [students, setStudents] = useState<Student[]>([
		{
			name: '',
			skills: Array(SWIMMER1SKILLS.length).fill(false),
			passed: false,
		},
	]);

	const addStudent = () => {
		setStudents([
			...students,
			{
				name: '',
				skills: Array(SWIMMER1SKILLS.length).fill(false),
				passed: false,
			},
		]);
	};

	const handleStudentNameChange = (index: number, name: string) => {
		const updatedStudents = [...students];
		updatedStudents[index].name = name;
		setStudents(updatedStudents);
	};

	const handleSkillChange = (studentIndex: number, skillIndex: number) => {
		const updatedStudents = [...students];
		const updatedSkills = [...updatedStudents[studentIndex].skills];
		updatedSkills[skillIndex] = !updatedSkills[skillIndex];

		const allSkillsChecked = updatedSkills.every((skill) => skill);

		updatedStudents[studentIndex].skills = updatedSkills;
		updatedStudents[studentIndex].passed = allSkillsChecked;

		setStudents(updatedStudents);
	};

	const handleStudentRemove = (index: number) => {
		const updatedStudents = students.filter((_, i) => i !== index);
		setStudents(updatedStudents);
	};

	const handlePassedChange = (index: number) => {
		const updatedStudents = [...students];
		const student = updatedStudents[index];
		student.passed = !student.passed;
		student.skills = student.passed
			? Array(SWIMMER1SKILLS.length).fill(true)
			: student.skills;
		setStudents(updatedStudents);
	};

	return (
		<Box display="flex" flexDirection="column" flex={1} maxHeight="100%">
			<Typography variant="h5">Create</Typography>
			<Paper
				sx={{
					marginTop: 2,
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					overflow: 'auto',
					padding: 2,
				}}
			>
                <Stack direction='row-reverse'>
                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </Stack>
				<Stack spacing={2} py={1}>
					<TextField
						id="instructor-input"
						label="Instructor"
						defaultValue="Dayne"
						InputProps={{
							readOnly: true,
						}}
					/>
					<Stack direction="row" spacing={2}>
						<TextField
							fullWidth
							id="level-select"
							select
							label="Level"
						></TextField>
						<TextField
							fullWidth
							id="session-select"
							select
							label="Session"
						></TextField>
					</Stack>
					<Grid container>
						<Grid item xs={6} md={3} p={0.5}>
							<TextField
								fullWidth
								id="year-select"
								label="Year"
							/>
						</Grid>
						<Grid item xs={6} md={3} p={0.5}>
							<TextField
								fullWidth
								id="day-select"
								select
								label="Day"
							/>
						</Grid>
						<Grid item xs={6} md={3} p={0.5}>
							<TextField
								fullWidth
								id="time-select"
								label="Time"
							/>
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
					<Divider />
					<Stack direction="row-reverse">
						<Button variant="outlined" startIcon={<RedoIcon />}>
							Restart
						</Button>
					</Stack>

					<StudentTable
						students={students}
						skills={SWIMMER1SKILLS}
						onStudentNameChange={handleStudentNameChange}
						onStudentRemove={handleStudentRemove}
						onStudentPassedChange={handlePassedChange}
						onSkillChange={handleSkillChange}
					/>

					<Stack
						direction="row"
						justifyContent="space-between"
						spacing={2}
					>
						<Button
							variant="contained"
							onClick={addStudent}
							startIcon={<AddIcon />}
						>
							Add Student
						</Button>
                        <Stack direction='row' spacing={2}>
                            <TextField select size='small' id='group-select' label='Group' sx={{width: '10rem'}} />
                            <Button variant="outlined" startIcon={<CheckIcon />}>
                                Submit
                            </Button>
                            
                        </Stack>
					</Stack>
				</Stack>
			</Paper>
		</Box>
	);
};

export default Create;
