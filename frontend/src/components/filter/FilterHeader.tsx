import { Stack, Button, Divider } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import InstructorSearch from '../inputs/InstructorSearch';

interface FilterHeaderProps {
	disabled?: boolean;
	setModalOpen: (value: boolean) => void;
	setSortModalOpen: (value: boolean) => void;
	handleMultipleInstructorSelect: (type: string, filter: string[]) => void;
}

const FilterHeader = ({
	disabled = false,
	setModalOpen,
	setSortModalOpen,
	handleMultipleInstructorSelect,
}: FilterHeaderProps) => {
	return (
		<>
			<InstructorSearch
				label="Search"
				size="small"
				handleSelect={handleMultipleInstructorSelect}
			/>
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
					disabled={disabled}
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
