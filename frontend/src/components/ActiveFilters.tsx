import { Chip, Box, useTheme } from '@mui/material';

type ActiveFiltersProps = {
	filters: string[];
	onRemoveFilter: (filter: string) => void;
};

const ActiveFilters = ({ filters, onRemoveFilter }: ActiveFiltersProps) => {
	const theme = useTheme();
    
    return (
		<Box mt={2}>
			{filters.map((filter) => (
				<Chip
					key={filter}
					label={filter}
					onDelete={() => onRemoveFilter(filter)}
                    color='primary'
					style={{ marginRight: theme.spacing(1) }}
				/>
			))}
		</Box>
	);
};

export default ActiveFilters;
