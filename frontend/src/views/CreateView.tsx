import { useContext, useState } from 'react';
import WorksheetHeaderInputs from '../components/inputs/WorksheetHeaderInputs';
import { Stack, Divider, IconButton } from '@mui/material';
import StudentTable from '../components/inputs/StudentTable';
import WorksheetFooterInputs from '../components/inputs/WorksheetFooterInputs';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { newWorksheet } from '../config/worksheetType';
import { SkillDescription } from '../config/levelSkillDescriptions';
import { WORKSHEET_VALUES } from '../config/worksheetData';
import { AlertContext } from '../App';
import ViewHeader from '../components/layout/ViewHeader';
import AddToGroupModal from '../components/filter/AddToGroupModal';
interface CreateViewProps {
	defaultValues?: Partial<newWorksheet>;
	worksheetId?: string;
	disabled?: boolean;
}

const DEFAULT_HEADER_VALUES: newWorksheet = {
	instructor: { _id: '66e0841ce781e4ee0b2602f1', name: 'Greg P' },
	level: null,
	session: null,
	day: null,
	time: '',
	year: '',
	location: null,
	students: [],
};

const CURRENT_YEAR = new Date().getFullYear();

const CreateView = ({
	worksheetId = '',
	defaultValues = {},
	disabled = false,
}: CreateViewProps) => {
	const navigate = useNavigate();
	const showAlert = useContext(AlertContext);

	const [header, setHeader] = useState<newWorksheet>({
		...DEFAULT_HEADER_VALUES,
		...defaultValues,
	});

	const [skills, setSkills] = useState<SkillDescription>(
		defaultValues.level || defaultValues.level === 0
			? WORKSHEET_VALUES.levels.descriptions[defaultValues.level]
			: []
	);

	const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
	const [loading, setIsLoading] = useState<boolean>(false);
	const [validationErrors, setValidationErrors] = useState<{
		[key: string]: string;
	}>({});

	const validateFields = () => {
		const newErrors: { [key: string]: string } = {};
		const yearAsNum = Number(header.year);

		if (!header.instructor) newErrors.instructor = 'Instructor is required';
		if (header.level === null) newErrors.level = 'Level is required';
		if (header.session === null) newErrors.session = 'Session is required';
		if (!header.year || yearAsNum < 2000 || yearAsNum > CURRENT_YEAR) {
			newErrors.year = `Year must be in range 2000-${CURRENT_YEAR}`;
		}

		if (!header.time || !/^([01]\d|2[0-3]):([0-5]\d)$/.test(header.time)) {
			newErrors.time = 'Time must be in HH:MM format';
		}
		if (header.day === null) newErrors.day = 'Day is required';
		if (header.location === null)
			newErrors.location = 'Location is required';
		if (!header.students || header.students.length === 0) {
			newErrors.students = 'At least one student must be added';
		} else {
			header.students.forEach((student, index) => {
				if (!student.name) {
					newErrors[`student-${index}-name`] =
						'Student name is required';
				}
			});
		}

		setValidationErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const submitWorksheet = async () => {
		let method = 'POST';
		let uri = 'http://localhost:3000/api/worksheets';

		if (!validateFields()) return;

		if (worksheetId) {
			method = 'PUT';
			uri += `/${worksheetId}`;
		}

		const instructorId =
			typeof header.instructor === 'string'
				? header.instructor
				: header.instructor._id;

		const worksheetJSON = JSON.stringify({
			...header,
			instructor: instructorId,
			year: Number(header.year),
		});

		try {
			setIsLoading(true);

			const res = await fetch(uri, {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: worksheetJSON,
			});

			if (!res.ok) {
				const errorData = await res.json();
				const errorMessage =
					errorData.message || 'Network response was not ok';
				throw new Error(errorMessage);
			}

			const result = await res.json();

			if (result._id && !worksheetId) navigate(`/library/${result._id}`);
			showAlert('Sucessfully created worksheet', 'success');
		} catch (error) {
			const errorMesage =
				error instanceof Error
					? error.message
					: 'An unkown error occurred';

			showAlert(errorMesage || '', 'error');
		} finally {
			setIsLoading(false);
		}
	};

	const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		if (name in header) {
			setHeader((prevValues) => ({
				...prevValues,
				[name]: value,
			}));
		}
	};

	const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newLevel = parseInt(event.target.value);
		const newSkills = WORKSHEET_VALUES.levels.descriptions[newLevel];
		setSkills(newSkills);

		setHeader((prevValues) => ({
			...prevValues,
			level: newLevel,
			students: [
				{
					name: '',
					skills: Array(newSkills.length).fill(false),
					passed: false,
				},
			],
		}));
	};

	const addStudent = () => {
		const newStudent = {
			name: '',
			skills: Array(skills.length).fill(false),
			passed: false,
		};

		setHeader((prevValues) => ({
			...prevValues,
			students: [...prevValues.students, newStudent],
		}));
	};

	const handleStudentNameChange = (index: number, name: string) => {
		const updatedStudents = [...header.students];
		updatedStudents[index].name = name;

		setHeader((prevValues) => ({
			...prevValues,
			students: updatedStudents,
		}));
	};

	const handleStudentRemove = (index: number) => {
		const updatedStudents = header.students.filter((_, i) => i !== index);
		setHeader((prevValues) => ({
			...prevValues,
			students: updatedStudents,
		}));
	};

	const handleSkillChange = (studentIndex: number, skillIndex: number) => {
		const updatedStudents = [...header.students];
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

	const handlePassedChange = (index: number) => {
		const students = [...header.students];
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

	const resetTable = () => {
		setHeader((prevValues) => ({
			...prevValues,
			level: -1,
			students: [],
		}));

		setSkills([]);
	};

	const content = (
		<Stack width="100%" spacing={2}>
			<ViewHeader text="Create" />
			<WorksheetHeaderInputs
				errors={validationErrors}
				worksheetHeader={header}
				handleGroupChange={setSelectedGroupId}
				handleLevelChange={handleLevelChange}
				handleHeaderChange={handleHeaderChange}
				disabled={disabled || loading}
			/>
			<Divider />
			{header.students.length > 0 && skills && (
				<>
					<Stack alignItems="flex-end" mx={2} height={40}>
						{(!worksheetId || !disabled) && (
							<IconButton onClick={resetTable}>
								<CloseIcon />
							</IconButton>
						)}
					</Stack>
					<StudentTable
						disabled={loading || disabled}
						students={header.students}
						skills={skills}
						errors={validationErrors}
						onStudentNameChange={handleStudentNameChange}
						onStudentRemove={handleStudentRemove}
						onStudentPassedChange={handlePassedChange}
						onSkillChange={handleSkillChange}
					/>
					{(!worksheetId || !disabled) && (
						<WorksheetFooterInputs
							addStudent={addStudent}
							disabled={loading || disabled}
							submit={submitWorksheet}
							loading={loading}
						/>
					)}
				</>
			)}
		</Stack>
	);

	return <>{content}</>;
};

export default CreateView;
