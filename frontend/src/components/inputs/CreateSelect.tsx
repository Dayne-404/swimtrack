import { TextField, MenuItem } from '@mui/material';
import capitalizeFirstLetter from '../../helper/capitalizeFirstLetter';
interface CreateSelectProps {
	label: string;
	menuItems?: string[];
	value?: number | null;
	name?: string;
	error?: string;
	disabled?: boolean;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateSelect = ({
	label,
	menuItems = [],
	value = null,
	error,
	handleChange,
	disabled = false,
}: CreateSelectProps) => {
	return (
		<TextField
			select
			label={capitalizeFirstLetter(label)}
			name={label}
			value={value ?? ''}
			onChange={handleChange}
			error={!!error}
			helperText={error ? error : ' '}
			disabled={disabled}
			fullWidth
		>
			{menuItems.map((item, index) => (
				<MenuItem key={`${item}-${index}`} value={index}>
					{item}
				</MenuItem>
			))}
		</TextField>
	);
};

export default CreateSelect;
