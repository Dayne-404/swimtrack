import { Stack, Divider } from '@mui/material';
import StudentTable from '../components/inputs/StudentTable.tsx';
import { useState } from 'react';
import { SKILLDESCRIPTIONS } from '../config/levels.ts';

import WorksheetHeaderInputs from '../components/inputs/WorksheetHeaderInputs.tsx';
import WorksheetFooterInputs from '../components/inputs/WorksheetFooterInputs.tsx';
import RestartButton from '../components/inputs/RestartButton.tsx';
import View from '../components/layout/View.tsx';

interface Student {
	name: string;
	skills: boolean[];
	passed: boolean;
}

const Create = () => {
	const [students, setStudents] = useState<Student[] | null>(null);
	const [worksheetLevel, setWorksheetLevel] = useState<string>('');

	const addStudent = () => {
		if (!students) return;

		setStudents([
			...students,
			{
				name: '',
				skills: Array(SKILLDESCRIPTIONS[worksheetLevel].length).fill(
					false
				),
				passed: false,
			},
		]);
	};

	const handleWorksheetLevelChange = (level: string) => {
		if (level in SKILLDESCRIPTIONS) {
			const validLevel = level as keyof typeof SKILLDESCRIPTIONS;
			setWorksheetLevel(validLevel);
			setStudents([
				{
					name: '',
					skills: Array(SKILLDESCRIPTIONS[validLevel].length).fill(
						false
					),
					passed: false,
				},
			]);
		} else {
			console.error(`Invalid level: ${level}`);
			setWorksheetLevel('');
			setStudents(null);
		}
	};

	const handleStudentNameChange = (index: number, name: string) => {
		if (!students) return;
		const updatedStudents = [...students];
		updatedStudents[index].name = name;
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

	const handleStudentRemove = (index: number) => {
		if (!students) return;
		const updatedStudents = students.filter((_, i) => i !== index);
		setStudents(updatedStudents);
	};

	const handlePassedChange = (index: number) => {
		if (!students) return;
		const updatedStudents = [...students];
		const student = updatedStudents[index];
		student.passed = !student.passed;
		student.skills = student.passed
			? Array(SWIMMER1SKILLS.length).fill(true)
			: student.skills;
		setStudents(updatedStudents);
	};

	return (
		<View
			headerText="Create"
			body={
				<Stack spacing={2} py={2} width="100%" overflow="auto">
					<WorksheetHeaderInputs
						level={worksheetLevel}
						handleLevelChange={handleWorksheetLevelChange}
					/>
					{!students ? (
						<></>
					) : (
						<>
							<Divider />
							<RestartButton />
							<StudentTable
								students={students}
								skills={SWIMMER1SKILLS}
								onStudentNameChange={handleStudentNameChange}
								onStudentRemove={handleStudentRemove}
								onStudentPassedChange={handlePassedChange}
								onSkillChange={handleSkillChange}
							/>
							<WorksheetFooterInputs addStudent={addStudent} />
						</>
					)}
				</Stack>
			}
		/>
	);
};

export default Create;
