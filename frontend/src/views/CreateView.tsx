import { useState } from 'react';
import WorksheetHeaderInputs from '../components/inputs/WorksheetHeaderInputs';
import View from '../components/layout/View';
import { Stack, Divider, IconButton } from '@mui/material';
import { WORKSHEETS, LevelKey } from '../config/levels';
import StudentTable from '../components/inputs/StudentTable';
import WorksheetFooterInputs from '../components/inputs/WorksheetFooterInputs';
import CloseIcon from '@mui/icons-material/Close';
import SnackbarAlert from '../components/layout/SnackbarAlert';
import { useNavigate } from 'react-router-dom';
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

interface CreateViewProps {
	headerValues?: WorksheetHeaderValues;
	defaultStudents?: Student[];
	id?: string;
	disabled?: boolean;
	fullView?: boolean;
}

interface SnackbarContent {
	open: boolean;
	severity: 'success' | 'error';
	message: string;
}

const CreateView = ({
	headerValues = {
		instructor: 'Bianca',
		level: '',
		session: '',
		year: '',
		day: '',
		time: '',
		location: '',
	},
	defaultStudents,
	id,
	disabled = false,
	fullView = true,
}: CreateViewProps) => {
	const navigate = useNavigate();
	const getWorksheetSkills = (levelId: string): string[] | undefined => {
		return WORKSHEETS.levels[levelId as LevelKey].descriptions || undefined;
	};
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [students, setStudents] = useState<Student[] | undefined>(
		defaultStudents
	);
	const [loading, setIsLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [snackbarState, setSnackbarState] = useState<SnackbarContent>({
		open: false,
		message: '',
		severity: 'error',
	});
	const [worksheetSkills, setWorksheetSkills] = useState<
		string[] | undefined
	>(headerValues.level ? getWorksheetSkills(headerValues.level) : undefined);

	const [worksheetHeaderValues, setWorksheetHeaderValues] =
		useState<WorksheetHeaderValues>(headerValues);
	const AUTO_HIDE_DURATION = 6000;

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
		return Object.keys(newErrors).length === 0;
	};

	const submitWorksheet = async () => {
		let method = 'POST';
		let uri = 'http://localhost:3000/api/worksheets';

		if (!validateFields()) return;

		if (id) {
			method = 'PUT';
			uri += `/${id}`;
		}

		const worksheetJSON = JSON.stringify({
			...worksheetHeaderValues,
			students: students,
		});

		try {
			setIsLoading(true);
			setIsDisabled(true);

			const res = await fetch(uri, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: worksheetJSON,
			});

			if (!res.ok) {
				throw new Error(
					`Network response was not ok: ${res.statusText}`
				);
			}

			const result = await res.json();
			if (result._id && !id) navigate(`/library/${result._id}`);
		} catch (error) {
			const errorMesage =
				error instanceof Error
					? error.message
					: 'An unkown error occurred';

			setSnackbarState({
				open: true,
				message: `Error submitting worksheet: ${errorMesage}`,
				severity: 'error',
			});
		} finally {
			setIsLoading(false);
			setIsDisabled(false);
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
		setStudents(undefined);
		setWorksheetSkills(undefined);
		setWorksheetHeaderValues((prevValues) => ({
			...prevValues,
			level: '',
		}));
	};

	const content = (
		<Stack width="100%" spacing={2}>
			<WorksheetHeaderInputs
				disabled={isDisabled || disabled}
				worksheetHeaderValues={worksheetHeaderValues}
				errors={errors}
				handleLevelChange={handleLevelChange}
				handleHeaderChange={handleHeaderChange}
			/>
			<Divider />
			{students && worksheetSkills ? (
				<>
					<Stack alignItems="flex-end" mx={2} height={40}>
						{(!id || !disabled) && (
							<IconButton onClick={resetTable}>
								<CloseIcon />
							</IconButton>
						)}
					</Stack>

					<StudentTable
						disabled={isDisabled || disabled}
						students={students}
						skills={worksheetSkills}
						errors={errors}
						onStudentNameChange={handleStudentNameChange}
						onStudentRemove={handleStudentRemove}
						onStudentPassedChange={handlePassedChange}
						onSkillChange={handleSkillChange}
					/>

					{(!id || !disabled) && (
						<WorksheetFooterInputs
							addStudent={addStudent}
							disabled={isDisabled || disabled}
							submit={submitWorksheet}
							loading={loading}
						/>
					)}
				</>
			) : undefined}
		</Stack>
	);

	if (!fullView) {
		return content;
	}

	return (
		<>
			<SnackbarAlert
				snackbarState={snackbarState}
				setSnackbarState={setSnackbarState}
				autoHideDuration={AUTO_HIDE_DURATION}
			/>
			<View headerText="Create" body={content} />
		</>
	);
};

export default CreateView;
