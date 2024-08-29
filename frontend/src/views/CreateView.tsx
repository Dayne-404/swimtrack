import { useState } from 'react';
import WorksheetHeaderInputs from '../components/inputs/WorksheetHeaderInputs';
import View from '../components/layout/View';
import { Stack, Divider, IconButton } from '@mui/material';
import { WORKSHEETS, LevelKey } from '../config/levels';
import StudentTable from '../components/inputs/StudentTable';
import WorksheetFooterInputs from '../components/inputs/WorksheetFooterInputs';
import CloseIcon from '@mui/icons-material/Close';

interface WorksheetHeaderValues {
	instructor: string;
	level: string;
	session: string;
	year: string;
	day: string;
	time: string;
	location: string;
}
interface Student {
	name: string;
	skills: boolean[];
	passed: boolean;
}

const CreateView = () => {
	const [students, setStudents] = useState<Student[] | null>(null);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [worksheetSkills, setWorksheetSkills] = useState<string[] | null>(
		null
	);
	const [worksheetHeaderValues, setWorksheetHeaderValues] =
		useState<WorksheetHeaderValues>({
			instructor: 'Dayne',
			level: '',
			session: '',
			year: '',
			day: '',
			time: '',
			location: '',
		});

	const validateFields = () => {
		const newErrors: { [key: string]: string } = {};

		if (!worksheetHeaderValues.instructor)
			newErrors.instructor = 'Instructor is required';
		if (!worksheetHeaderValues.level) newErrors.level = 'Level is required';
		if (!worksheetHeaderValues.session)
			newErrors.session = 'Session is required';
		if (
			!worksheetHeaderValues.year ||
			!/^\d{4}$/.test(worksheetHeaderValues.year)
		)
			newErrors.year = 'Year must be a 4-digit number';
		if (
			!worksheetHeaderValues.time ||
			!/^([01]\d|2[0-3]):([0-5]\d)$/.test(worksheetHeaderValues.time)
		) {
			newErrors.time = 'Time must be in HH:MM format';
		}
		if (!worksheetHeaderValues.day) newErrors.day = 'Day is required';
		if (!worksheetHeaderValues.location)
			newErrors.location = 'Location is required';
		if (!students || students.length === 0) {
			newErrors.students = 'At least one student must be added';
		} else {
			students.forEach((student, index) => {
				if (!student.name) {
					newErrors[`student-${index}-name`] =
						'Student name is required';
				}
			});
		}

		setErrors(newErrors);
		console.log(newErrors);
		console.log(`ERRORS: ${Object.keys(newErrors).length}`);
		return Object.keys(newErrors).length === 0;
	};

	const submitWorksheet = async () => {
		if (!validateFields()) return;

		const worksheetJSON = JSON.stringify({
			...worksheetHeaderValues,
			students: students,
		});

		console.log(worksheetJSON);

		try {
			const res = await fetch('http://localhost:3000/api/worksheets', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: worksheetJSON,
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}

			const result = await res.json();
			console.log('Success:', result);
			alert('Worksheet submitted successfully');
		} catch (error) {
			console.error('Error:', error);
			alert('There was an error submitting the worksheet');
		}
	};

	const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setWorksheetHeaderValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleLevelChange = (newLevel: string) => {
		const newWorksheetSkills =
			WORKSHEETS.levels[newLevel as LevelKey].descriptions || null;

		setWorksheetSkills(newWorksheetSkills);

		setStudents([
			{
				name: '',
				skills: Array(newWorksheetSkills.length).fill(false),
				passed: false,
			},
		]);

		setWorksheetHeaderValues((prevValues) => ({
			...prevValues,
			level: newLevel,
		}));
	};

	const addStudent = () => {
		if (!students || !worksheetSkills) return;
		setStudents([
			...students,
			{
				name: '',
				skills: Array(worksheetSkills.length).fill(false),
				passed: false,
			},
		]);
	};

	const handleStudentNameChange = (index: number, name: string) => {
		if (!students) return;
		const updatedStudents = [...students];
		updatedStudents[index].name = name;
		setStudents(updatedStudents);
	};

	const handleStudentRemove = (index: number) => {
		if (!students) return;
		const updatedStudents = students.filter((_, i) => i !== index);
		setStudents(updatedStudents);
	};

	const handleSkillChange = (studentIndex: number, skillIndex: number) => {
		if (!students) return;
		const updatedStudents = [...students];
		const updatedSkills = [...updatedStudents[studentIndex].skills];
		updatedSkills[skillIndex] = !updatedSkills[skillIndex];

		const allSkillsChecked = updatedSkills.every((skill) => skill);

		updatedStudents[studentIndex].skills = updatedSkills;
		updatedStudents[studentIndex].passed = allSkillsChecked;

		setStudents(updatedStudents);
	};

	const handlePassedChange = (index: number) => {
		if (!students || !worksheetSkills) return;
		const updatedStudents = [...students];
		const student = updatedStudents[index];
		student.passed = !student.passed;
		student.skills = student.passed
			? Array(worksheetSkills.length).fill(true)
			: student.skills;
		setStudents(updatedStudents);
	};

	const resetTable = () => {
		setStudents(null);
		setWorksheetSkills(null);
		setWorksheetHeaderValues((prevValues) => ({
			...prevValues,
			level: '',
		}));
	};

	return (
		<View
			headerText="Create"
			body={
				<Stack width="100%" spacing={2}>
					<WorksheetHeaderInputs
						worksheetHeaderValues={worksheetHeaderValues}
						errors={errors}
						handleLevelChange={handleLevelChange}
						handleHeaderChange={handleHeaderChange}
					/>
					<Divider />
					{students && worksheetSkills ? (
						<>
							<Stack alignItems="flex-end" mx={2}>
								<IconButton onClick={resetTable}>
									<CloseIcon />
								</IconButton>
							</Stack>
							<StudentTable
								students={students}
								skills={worksheetSkills}
								errors={errors}
								onStudentNameChange={handleStudentNameChange}
								onStudentRemove={handleStudentRemove}
								onStudentPassedChange={handlePassedChange}
								onSkillChange={handleSkillChange}
							/>
							<WorksheetFooterInputs
								addStudent={addStudent}
								submit={submitWorksheet}
							/>
						</>
					) : undefined}
				</Stack>
			}
		/>
	);
};

export default CreateView;
