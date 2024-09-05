import React from 'react';
import { Chip, Stack } from '@mui/material';
import capitalizeFirstLetter from '../../helper/capitalizeFirstLetter';
interface FiltersByType {
    [type: string]: string[];
}
interface ActiveFiltersProps {
	filters: FiltersByType;
	onRemoveFilter: (type: string, filter: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
	filters,
	onRemoveFilter,
}) => {
	return (
		<Stack direction="row" spacing={1} flexWrap="wrap">
			{Object.entries(filters).map(([type, filterArray]) =>
				filterArray.map((filter) => (
					<Chip
						key={`${type}-${filter}`}
						label={capitalizeFirstLetter(filter)}
						onDelete={() => onRemoveFilter(type, filter)}
						color='primary'
					/>
				))
			)}
		</Stack>
	);
};

export default ActiveFilters;
