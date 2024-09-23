import {
	Autocomplete,
	TextField,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { InstructorPublic } from '../../../config/instructorType';
import { fetchInstructors } from '../../../helper/instructorGetRequests';

interface InstructorSearchProps {
	label?: string;
	disabled?: boolean;
	size?: 'small' | 'medium';
	handleSelect: (type: string, filter: string[]) => void;
}

const InstructorSearch = ({
	label,
	disabled = false,
	size = 'medium',
	handleSelect,
}: InstructorSearchProps) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [instructors, setInstructors] = useState<InstructorPublic[]>([]);

	useEffect(() => {
		const fetchGroupNames = async () => {
			setLoading(true);
			try {
				const data: InstructorPublic[] = await fetchInstructors({
					search: searchTerm,
				});

				setInstructors(data);
			} catch (error) {
				console.error('Error fetching instructors:', error);
			} finally {
				setLoading(false);
			}
		};

		const delayDebounceFn = setTimeout(() => {
			fetchGroupNames();
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	const handleChange = (
		_event: React.SyntheticEvent,
		instructor: InstructorPublic[]
	) => {
		handleSelect('instructor', instructor.map(instructor => instructor._id));
	};

	const handleInputChange = (
		_event: React.SyntheticEvent,
		newInputValue: string
	) => {
		setSearchTerm(newInputValue);
	};

	const getInitials = (name: string) => {
		if (name.length < 2) return name.charAt(0);
		return `${name.charAt(0)}${name.charAt(name.length - 1)}`;
	};

	return (
		<Autocomplete
			disabled={disabled}
			size={size}
			multiple
			fullWidth
			loading={loading}
			options={instructors}
			getOptionLabel={(option: InstructorPublic) => option.name}
			isOptionEqualToValue={(
				option: InstructorPublic,
				value: InstructorPublic | null
			) => option._id === value?._id}
			onInputChange={handleInputChange}
			onChange={handleChange}
		
			renderInput={(params) => (
				<TextField
					{...params}
					disabled={disabled}
					label={label}
					variant="outlined"
					fullWidth
				/>
			)}
			renderOption={(props, instructor: InstructorPublic) => (
				<ListItem {...props} key={instructor._id}>
					<ListItemAvatar>
						<Avatar
							alt={instructor.name}
							sx={{ width: '32px', height: '32px', fontSize: 14 }}
						>
							{getInitials(instructor.name)}
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={instructor.name} />
				</ListItem>
			)}
		/>
	);
};

export default InstructorSearch;
