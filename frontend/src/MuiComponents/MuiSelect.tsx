import { Box, TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

const MuiSelect = () => {
	const [country, setCountry] = useState<string[]>([]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setCountry(typeof value === 'string' ? value.split(',') : value);
	};

	return (
		<Box width="250px">
			<TextField
				label="Select Country"
				select
				value={country}
				onChange={handleChange}
				fullWidth
				SelectProps={{
					multiple: true,
				}}
                size='small'
                color='secondary'
                helperText={!country.length ? 'Please select your country' : ' '}
                error={!country.length}
			>
				<MenuItem value="CA">Canada</MenuItem>
				<MenuItem value="IN">India</MenuItem>
				<MenuItem value="USA">USA</MenuItem>
			</TextField>
		</Box>
	);
};

export default MuiSelect;
