import { TextField, MenuItem } from '@mui/material';
import capitalizeFirstLetter from '../../helper/capitalizeFirstLetter';
interface CreateSelectProps {
	label: string;
	menuItems?: string[] | { [key: string]: { name: string } };
	value?: string;
	name?: string;
	error?: string;
	disabled?: boolean;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateSelect = ({
	label,
	name = '',
	menuItems = [],
	value = '',
	error,
	handleChange,
	disabled = false,
}: CreateSelectProps) => {
	return (
		<TextField
			disabled={disabled}
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
