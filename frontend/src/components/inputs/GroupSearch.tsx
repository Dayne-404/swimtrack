import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import {
	fetchGroupsByInstructor,
	FetchGroupsResponse,
} from '../../helper/groupFetch';
import { Group } from '../../config/groupType';

interface GroupSearchProps {
	label?: string;
	instructorId: string;
    handleGroupChange: (e: string | null) => void;
}

const GroupSearch = ({label = 'Add to Group', instructorId, handleGroupChange }: GroupSearchProps) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [options, setOptions] = useState<Group[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchGroupNames = async () => {
            setLoading(true);
			try {
				const data: FetchGroupsResponse = await fetchGroupsByInstructor(
					{
						instructorId,
						search: searchTerm,
					}
				);
				setOptions(data.groups);
			} catch (error) {
				console.error('Error fetching groups:', error);
			} finally {
				setLoading(false);
			}
		};

		const delayDebounceFn = setTimeout(() => {
			fetchGroupNames();
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm, instructorId]);

	const handleChange = (_event: React.SyntheticEvent, newValue: Group | null) => {
		handleGroupChange(newValue ? newValue._id : null);
	};

    const handleInputChange = (_event: React.SyntheticEvent, newInputValue: string) => {
		setSearchTerm(newInputValue);
	};

	return (
		<Autocomplete
			fullWidth
			loading={loading}
			options={options}
			getOptionLabel={(option: Group) => option.name}
			isOptionEqualToValue={(option: Group, value: Group | null) =>
				option._id === value?._id
			}
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

export default GroupSearch;
