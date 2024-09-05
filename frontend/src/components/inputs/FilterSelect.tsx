import React, { useCallback } from 'react';
import { MenuItem, Select, SelectChangeEvent, useTheme } from '@mui/material';
import capitalizeFirstLetter from '../../helper/capitalizeFirstLetter';

interface FilterComponentProps {
	size: 'medium' | 'small';
	placeholder: string;
	availableFilters: string[];
	selectedFilters: string[];
	onFiltersChange: (selectedFilter: string) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
	size,
	placeholder,
	availableFilters,
	selectedFilters,
	onFiltersChange,
}) => {
	const theme = useTheme();

	const MAX_VISIBLE_ITEMS = 5;
	const ITEM_HEIGHT = 48;
	const MENU_HEIGHT = ITEM_HEIGHT * MAX_VISIBLE_ITEMS;

	const handleFilterChange = useCallback(
		(event: SelectChangeEvent<string>) => {
			const selectedFilter = event.target.value as string;
			if (selectedFilter && !selectedFilters.includes(selectedFilter)) {
				onFiltersChange(selectedFilter);
			}
		},
		[selectedFilters, onFiltersChange]
	);

	return (
		<Select
			size={size}
			value=""
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
			<MenuItem value="" disabled>
				<span style={{ color: theme.palette.text.secondary }}>
					{placeholder}
				</span>
			</MenuItem>
			{availableFilters.map((filter) => (
				<MenuItem
					key={filter}
					value={filter}
					disabled={selectedFilters.includes(filter)}
				>
					{capitalizeFirstLetter(filter)}
				</MenuItem>
			))}
		</Select>
	);
};

export default FilterComponent;
