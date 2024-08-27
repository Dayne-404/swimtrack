import { Chip, Stack } from '@mui/material';

type ActiveFiltersProps = {
	filters: string[];
	onRemoveFilter: (filter: string) => void;
};

const ActiveFilters = ({ filters, onRemoveFilter }: ActiveFiltersProps) => {    
    return (
		<Stack mt={2} spacing={1} direction='row' useFlexGap flexWrap='wrap'>
			{filters.map((filter) => (
				<Chip
					key={filter}
					label={filter}
					onDelete={() => onRemoveFilter(filter)}
                    color='primary'
				/>
			))}
		</Stack>
	);
};

export default ActiveFilters;
