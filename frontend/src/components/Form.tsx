// import { useState } from "react";
import { useState } from 'react';
import '../styles/form.css';

function Form() {
	const SESSIONS = ['', 'Spring', 'Summer', 'Winter', 'Fall'];
	const DAY = ['', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
	const LOCATION = ['', 'Rec', 'Dun'];

	type session = (typeof SESSIONS)[number];
	type day = (typeof DAY)[number];
	type location = (typeof LOCATION)[number];

	type WorksheetProps = {
		instructor: string;
		level: number;
		session: session;
		day: day;
		time: string;
		location: location;
		students: StudentProps[];
	};

	type StudentProps = {
		name: string;
		passed: boolean;
	};

	const [formData, setFormData] = useState<WorksheetProps>({
		instructor: '',
		level: 0,
		session: '',
		day: '',
		time: '',
		location: '',
		students: [],
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index?: number
	) => {
		const { name, value, type } = e.target;

		if (index !== undefined && name.startsWith('student_')) {
			// Handle student input changes
			const students = [...formData.students];
			students[index] = {
				...students[index],
				[name.split('_')[1]]:
					type === 'checkbox'
						? (e.target as HTMLInputElement).checked
						: value,
			};
			setFormData({ ...formData, students });
		} else {
			// Handle other input changes
			setFormData({
				...formData,
				[name]:
					name === 'level'
						? Number(value)
						: (value as WorksheetProps[keyof WorksheetProps]),
			});
		}
	};

	const addStudent = () => {
		setFormData({
			...formData,
			students: [...formData.students, { name: '', passed: false }],
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const jsonFormData = JSON.stringify(formData);

		try {
			const res = await fetch('http://localhost:3000/api/worksheets', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: jsonFormData,
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}

			const result = await res.json();
			console.log('Success:', result);
			alert('Form submitted successfully');
		} catch (error) {
			console.error('Error:', error);
			alert('There was an error submitting the form.');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="instructor">Instructor</label>
			<input
				id="instructor"
				name="instructor"
				type="text"
				value={formData.instructor}
				onChange={handleChange}
			/>
			<label htmlFor="level">level</label>
			<input
				id="level"
				name="level"
				type="text"
				min="0"
				max="6"
				value={formData.level}
				onChange={handleChange}
			/>
			<label htmlFor="session">session</label>
			<select
				id="session"
				name="session"
				value={formData.session}
				onChange={handleChange}
			>
				{SESSIONS.map((session) => (
					<option key={session} value={session}>
						{session}
					</option>
				))}
			</select>
			<label htmlFor="day">day</label>
			<select
				id="day"
				name="day"
				value={formData.day}
				onChange={handleChange}
			>
				{DAY.map((day) => (
					<option key={day} value={day}>
						{day}
					</option>
				))}
			</select>
			<label htmlFor="time">time</label>
			<input
				id="time"
				name="time"
				type="string"
				value={formData.time}
				onChange={handleChange}
			/>
			<label htmlFor="location">location</label>
			<select
				id="location"
				name="location"
				value={formData.location}
				onChange={handleChange}
			>
				{LOCATION.map((location) => (
					<option key={location} value={location}>
						{location}
					</option>
				))}
			</select>
			<h3>Students</h3>
			{formData.students.map((student, index) => (
				<div key={index}>
					<label htmlFor={`student_name_${index}`}>Name</label>
					<input
						id={`student_name_${index}`}
						name="student_name"
						type="text"
						value={student.name}
						onChange={(e) => handleChange(e, index)}
					/>
					<label htmlFor={`student_passed_${index}`}>Passed</label>
					<input
						id={`student_passed_${index}`}
						name="student_passed"
						type="checkbox"
						checked={student.passed}
						onChange={(e) => handleChange(e, index)}
					/>
				</div>
			))}
			<button type="button" onClick={addStudent}>
				Add Student
			</button>
			<input type="submit" value="Submit"></input>
		</form>
	);
}

export default Form;
