import React, { useState } from 'react';
import {
	MenuItem,
	Select,
	SelectChangeEvent,
	useTheme,
} from '@mui/material';

interface FilterComponentProps {
	size: 'medium' | 'small';
	placeholder: string;
	availableFilters: string[];
	selectedFilters: string[];
	onFiltersChange: (selectedFilters: string[]) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
	size,
	placeholder,
	availableFilters,
	selectedFilters,
	onFiltersChange,
}) => {
	const theme = useTheme();
	const [selectedValue, setSelectedValue] = useState<string>('');

	const MAX_VISIBLE_ITEMS = 3;
	const ITEM_HEIGHT = 48;
	const MENU_HEIGHT = ITEM_HEIGHT * MAX_VISIBLE_ITEMS;

	const handleFilterChange = (event: SelectChangeEvent<string>) => {
		const selectedFilter = event.target.value;
		if (selectedFilter) {
			const updatedFilters = [...selectedFilters, selectedFilter];
			onFiltersChange(updatedFilters);
			setSelectedValue('');
		}
	};

	return (
		<Select
			size={size}
			value={selectedValue}
			onChange={handleFilterChange}
			displayEmpty
			fullWidth
			MenuProps={{
				PaperProps: {
					sx: {
						maxHeight: MENU_HEIGHT,
					},
				},
			}}
		>
			<MenuItem value="" disabled sx={{ color: 'text.secondary' }}>
				<span style={{ color: theme.palette.text.secondary }}>
					{placeholder}
				</span>
			</MenuItem>
			{availableFilters.map((filter) => (
				<MenuItem key={filter} value={filter}>
					{filter}
				</MenuItem>
			))}
		</Select>
	);
};

export default FilterComponent;
