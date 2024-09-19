import { TextField, MenuItem } from '@mui/material';

interface SortSelectProps {
	menuItems: string[];
	option: number;
	setOption: React.Dispatch<React.SetStateAction<number>>;
}

const SortSelect = ({ menuItems, option, setOption }: SortSelectProps) => {
	return (
		<TextField
			size="small"
			value={option}
			label='Sort'
			onChange={(e) => setOption(Number(e.target.value))}
			fullWidth
			select
			sx={{
				textAlign: 'center',
			}}
		>
			{menuItems.map((item, index) => (
				<MenuItem key={item} value={index}>
					{item}
				</MenuItem>
			))}
		</TextField>
	);
};

export default SortSelect;
