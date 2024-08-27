import { TextField, MenuItem } from "@mui/material";

interface CreateSelectProps {
    label: string,
    menuItems: string[];
    value: string,
    handleChange: (value: string) => void;
}

const CreateSelect = ({label, menuItems, value, handleChange}: CreateSelectProps) => {
	return (
		<TextField
			fullWidth
			id="level-select"
			select
			value={value}
			onChange={(e) => handleChange(e.target.value)}
			label={label}
		>
            {menuItems.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </TextField>
	);
};

export default CreateSelect;
