import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Checkbox,
	TextField,
	IconButton,
	InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { newWorksheet } from '../../config/worksheetType';

interface StudentTableProps {
	values: newWorksheet;
	setHeader: React.Dispatch<React.SetStateAction<newWorksheet>>;
	skills: string[];
	errors: { [key: string]: string };
	disabled?: boolean;
}

const StudentTable = ({
	values,
	setHeader,
	skills,
	errors,
	disabled = false,
}: StudentTableProps) => {
	const handleStudentNameChange = (index: number, name: string) => {
		const updatedStudents = [...values.students];
		updatedStudents[index].name = name;

		setHeader((prevValues) => ({
			...prevValues,
			students: updatedStudents,
		}));
	};

	const handlePassedChange = (index: number) => {
		const students = [...values.students];
		const student = students[index];
		student.passed = !student.passed;
		student.skills = student.passed
			? Array(skills.length).fill(true)
			: student.skills;
		setHeader((prevValues) => ({
			...prevValues,
			students: students,
		}));
	};

	const handleSkillChange = (studentIndex: number, skillIndex: number) => {
		const updatedStudents = [...values.students];
		const updatedSkills = [...updatedStudents[studentIndex].skills];
		updatedSkills[skillIndex] = !updatedSkills[skillIndex];

		const allSkillsChecked = updatedSkills.every((skill) => skill);

		updatedStudents[studentIndex].skills = updatedSkills;
		updatedStudents[studentIndex].passed = allSkillsChecked;

		setHeader((prevValues) => ({
			...prevValues,
			students: updatedStudents,
		}));
	};

	const handleStudentRemove = (index: number) => {
		const updatedStudents = values.students.filter((_, i) => i !== index);
		setHeader((prevValues) => ({
			...prevValues,
			students: updatedStudents,
		}));
	};

	return (
		<TableContainer sx={{ paddingTop: '200px' }}>
			<Table>
				<TableHead>
					<TableRow>
						{values.students.length > 1 && !disabled && (
							<TableCell></TableCell>
						)}
						<TableCell>Name</TableCell>
						{skills.map((skill, index) => (
							<TableCell
								key={index}
								align="center"
								sx={{
									position: 'relative',
									padding: '2px',
									height: '60px', // Ensure sufficient height
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: '-110%',
										left: '130%',

										transform:
											'translate(-50%, -50%) rotate(-70deg)',
										width: '260px', // Set a fixed width for the text container

										textAlign: 'left', // Center text within the container
									}}
								>
									{skill}
								</div>
							</TableCell>
						))}
						<TableCell align="center">Passed</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{values.students.map((student, studentIndex) => (
						<TableRow key={studentIndex}>
							{values.students.length > 1 && !disabled && (
								<TableCell padding="none">
									<IconButton
										color="primary"
										onClick={() =>
											handleStudentRemove(studentIndex)
										}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							)}
							<TableCell>
								<TextField
									disabled={disabled}
									variant="standard"
									placeholder="Name"
									value={student.name}
									sx={{ width: '10rem' }}
									error={
										!!errors[`student-${studentIndex}-name`]
									}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{studentIndex + 1 + '.'}
											</InputAdornment>
										),
									}}
									onChange={(e) =>
										handleStudentNameChange(
											studentIndex,
											e.target.value
										)
									}
								/>
							</TableCell>
							{student.skills.map((skill, skillIndex) => (
								<TableCell
									key={skillIndex}
									align="center"
									sx={{ padding: '2px' }}
								>
									<Checkbox
										disabled={disabled}
										checked={skill}
										onChange={() =>
											handleSkillChange(
												studentIndex,
												skillIndex
											)
										}
									/>
								</TableCell>
							))}
							<TableCell align="center" sx={{ padding: '2px' }}>
								<Checkbox
									disabled={disabled}
									checked={student.passed}
									onChange={() =>
										handlePassedChange(studentIndex)
									}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default StudentTable;
