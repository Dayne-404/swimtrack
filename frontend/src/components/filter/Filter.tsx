import { Stack, Button, Divider } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import SearchBar from '../inputs/SearchBar';


interface FilterButtonProps {
	setModalOpen: (value: boolean) => void;
	setSortModalOpen: (value: boolean) => void;
}

const LibraryFilters = ({
	setModalOpen,
	setSortModalOpen,
}: FilterButtonProps) => {
	return (
		<>
			<SearchBar size="small" width="100%" placeholderText="Search" />
			<Stack direction="row" spacing={1}>
				<Button
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

export default LibraryFilters;
