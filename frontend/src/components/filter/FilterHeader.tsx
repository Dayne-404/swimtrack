import { Stack, Button, Divider } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import SearchBar from '../inputs/SearchBar';


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
			<SearchBar size="small" width="100%" placeholderText="Search" disabled={disabled} />
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
