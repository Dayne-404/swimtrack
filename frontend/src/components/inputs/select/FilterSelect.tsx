import React, { useCallback } from 'react';
import { MenuItem, Select, SelectChangeEvent, useTheme } from '@mui/material';
import SelectMenuProps from '../../../config/selectProps';

interface FilterComponentProps {
	size: 'medium' | 'small';
	placeholder: string;
	availableFilters: string[];
	selectedFilters: (string | number)[];
	onFiltersChange: (selectedFilter: number) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
	size,
	placeholder,
	availableFilters,
	selectedFilters,
	onFiltersChange,
}) => {
	const theme = useTheme();

	const handleFilterChange = useCallback(
		(event: SelectChangeEvent<string>) => {
			const selectedFilter = Number(event.target.value);
			if (selectedFilter || selectedFilter === 0 && !selectedFilters.includes(selectedFilter)) {
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
			MenuProps={SelectMenuProps.MenuProps}
		>
			<MenuItem value="" disabled>
				<span style={{ color: theme.palette.text.secondary }}>
					{placeholder}
				</span>
			</MenuItem>
			{availableFilters.map((filter, index) => (
				<MenuItem
					key={`${filter}-${index}`}
					value={index}
					disabled={selectedFilters.includes(index)}
				>
					{filter}
				</MenuItem>
			))}
		</Select>
	);
};

export default FilterComponent;
