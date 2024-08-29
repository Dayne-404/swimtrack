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

interface Student {
	name: string;
	skills: boolean[];
	passed: boolean;
}

interface StudentTableProps {
	students: Student[];
	skills: string[];
	errors: { [key: string]: string };
	onStudentNameChange: (index: number, name: string) => void;
	onStudentRemove: (index: number) => void;
	onStudentPassedChange: (index: number) => void;
	onSkillChange: (studentIndex: number, skillIndex: number) => void;
}

const StudentTable = ({
	students,
	skills,
	onStudentNameChange,
	onStudentRemove,
	onStudentPassedChange,
	onSkillChange,
	errors,
}: StudentTableProps) => {
	return (
		<TableContainer sx={{ paddingTop: '200px' }}>
			<Table>
				<TableHead>
					<TableRow>
						{students.length > 1 && <TableCell></TableCell>}
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
					{students.map((student, studentIndex) => (
						<TableRow key={studentIndex}>
							{students.length > 1 && (
								<TableCell padding="none">
									<IconButton
										color="primary"
										onClick={() =>
											onStudentRemove(studentIndex)
										}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							)}
							<TableCell>
								<TextField
									variant="standard"
									placeholder="Name"
									value={student.name}
									sx={{ width: '10rem' }}
									error={
										!!errors[
											`student-${studentIndex}-name`
										]
									}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{studentIndex + 1 + '.'}
											</InputAdornment>
										),
									}}
									onChange={(e) =>
										onStudentNameChange(
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
										checked={skill}
										onChange={() =>
											onSkillChange(
												studentIndex,
												skillIndex
											)
										}
									/>
								</TableCell>
							))}
							<TableCell align="center" sx={{ padding: '2px' }}>
								<Checkbox
									checked={student.passed}
									onChange={() =>
										onStudentPassedChange(studentIndex)
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
