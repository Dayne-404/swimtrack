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

	type FormProps = {
		instructor: string;
		level: number;
		session: session;
		day: day;
		time: string;
		location: location;
	};

	const [formData, setFormData] = useState<FormProps>({
		instructor: '',
		level: 0,
		session: '',
		day: '',
		time: '',
		location: '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]:
				name === 'level'
					? Number(value)
					: (value as FormProps[keyof FormProps]),
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
			<input type="submit" value="Submit"></input>
		</form>
	);
}

export default Form;
