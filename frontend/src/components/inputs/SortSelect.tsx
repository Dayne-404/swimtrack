import { TextField, MenuItem } from '@mui/material';
import { useState } from 'react';

interface SortSelectProps {
	menuItems: string[];
}

const SortSelect = ({ menuItems }: SortSelectProps) => {
	const [sortOption, setSortOption] = useState<string>(menuItems[0]);

	return (
		<TextField
			size="small"
			value={sortOption}
			label='Sort'
			onChange={(e) => setSortOption(e.target.value)}
			fullWidth
			select
			sx={{
				textAlign: 'center',
				'& .MuiOutlinedInput-root': {
					'& fieldset': { color: 'red' },
				},
			}}
		>
			{menuItems.map((item) => (
				<MenuItem key={item} value={item}>
					{item}
				</MenuItem>
			))}
		</TextField>
	);
};

export default SortSelect;
