import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Instructor } from '../../config/worksheetType';
import { fetchInstructors } from '../../helper/instructorFetch';

interface InstructorSearchProps {
	label?: string;
    disabled?: boolean;
	size?: 'small' | 'medium';
	handleGroupChange: (e: string | null, name: string | null) => void;
}

const InstructorSearch = ({
	label,
	disabled = false,
    size = 'medium',
	handleGroupChange,
}: InstructorSearchProps) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [options, setOptions] = useState<Instructor[]>([]);

	useEffect(() => {
		const fetchGroupNames = async () => {
			setLoading(true);
			try {
				const data: Instructor[] = await fetchInstructors({
					search: searchTerm,
				});

				setOptions(data);
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
		newValue: Instructor | null
	) => {
		handleGroupChange(
			newValue ? newValue._id : null,
			newValue ? newValue.name : null
		);
	};

	const handleInputChange = (
		_event: React.SyntheticEvent,
		newInputValue: string
	) => {
		setSearchTerm(newInputValue);
	};

	return (
		<Autocomplete
            disabled={disabled}
			size={size}
			fullWidth
			loading={loading}
			options={options}
			getOptionLabel={(option: Instructor) => option.name}
			isOptionEqualToValue={(
				option: Instructor,
				value: Instructor | null
			) => option._id === value?._id}
			onInputChange={handleInputChange}
			onChange={handleChange}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant="outlined"
					fullWidth
				/>
			)}
		/>
	);
};

export default InstructorSearch;
