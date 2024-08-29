import { TextField, MenuItem } from '@mui/material';

interface CreateSelectProps {
	label: string;
	menuItems?: string[] | { [key: string]: { name: string } };
	value?: string;
	name?: string;
	error?: string;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const capitalizeFirstLetter = (str: string): string => {
	if (!str) return '';
	return str.charAt(0).toUpperCase() + str.slice(1);
};

const CreateSelect = ({
	label,
	name = '',
	menuItems = [],
	value = '',
	error,
	handleChange,
}: CreateSelectProps) => {
	return (
		<TextField
			fullWidth
			name={name}
			id="level-select"
			select
			value={value}
			error={!!error}
			helperText={error ? error : ' '}
			onChange={handleChange}
			label={label}
		>
			{Array.isArray(menuItems)
				? menuItems.map((item) => (
						<MenuItem key={item} value={item}>
							{capitalizeFirstLetter(item)}
						</MenuItem>
				  ))
				: Object.entries(menuItems).map(([key, item]) => (
						<MenuItem key={key} value={key}>
							{capitalizeFirstLetter(item.name)}
						</MenuItem>
				  ))}
		</TextField>
	);
};

export default CreateSelect;
