import React from 'react';
import { Chip, Stack } from '@mui/material';
import { WORKSHEET_VALUES } from '../../config/worksheetData';
import capitalizeFirstLetter from '../../helper/capitalizeFirstLetter';

interface FiltersByType {
	[type: string]: (number | string)[];
}

interface ActiveFiltersProps {
	filters: FiltersByType;
	onRemoveFilter: (type: string, filter: number | string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
	filters,
	onRemoveFilter,
}) => {
	return (
		<Stack direction="row" spacing={1} flexWrap="wrap">
			{Object.entries(filters).map(([type, filterArray]) =>
				filterArray.map((filter) => {
					let label: string | number = filter;
					const pluralType = type + 's';
			
					if (pluralType === 'levels' && typeof filter === 'number') {
						label = WORKSHEET_VALUES.levels.names[filter] ?? `Level ${filter}`;
					} else {
						const worksheetValuesForType = WORKSHEET_VALUES[pluralType as keyof typeof WORKSHEET_VALUES];
						label = worksheetValuesForType
							? worksheetValuesForType[filter as keyof typeof worksheetValuesForType] ?? filter
							: filter;
					}

					return (
						<Chip
							key={`${type}-${filter}`}
							label={`${capitalizeFirstLetter(type)}: ${label}`}
							onDelete={() => onRemoveFilter(type, filter)}
							color="primary"
						/>
					);
				})
			)}
		</Stack>
	);
};

export default ActiveFilters;
