import { Stack, Button, Divider } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import SearchBar from '../inputs/SearchBar';
import InstructorSearch from '../inputs/InstructorSearch';


interface FilterHeaderProps {
	disabled?: boolean; 
	setModalOpen: (value: boolean) => void;
	setSortModalOpen: (value: boolean) => void;
}

const FilterHeader = ({
	disabled = false,
	setModalOpen,
	setSortModalOpen,
}: FilterHeaderProps) => {
	return (
		<>
			<InstructorSearch label='Search' size='small' disabled={disabled} />
			<Stack direction="row" spacing={1}>
				<Button
					disabled={disabled}
					variant="outlined"
					onClick={() => setModalOpen(true)}
					startIcon={<FilterAltIcon />}
					fullWidth
				>
					Filter
				</Button>
				<Button
					variant="outlined"
					onClick={() => setSortModalOpen(true)}
					startIcon={<SortIcon />}
					fullWidth
				>
					Sort
				</Button>
			</Stack>
			<Divider />
		</>
	);
};

export default FilterHeader;
