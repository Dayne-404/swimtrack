import {
	Stack,
	Button,
	TextField,
	Divider,
	MenuItem,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchBar from '../components/SearchBar';

interface LibraryFiltersProps {
	sortOption: string;
	setSortOption: (value: string) => void;
	setModalOpen: (value: boolean) => void;
}

const LibraryFilters = ({
	sortOption,
	setSortOption,
	setModalOpen,
}: LibraryFiltersProps) => {
	return (
		<>
			<SearchBar size="small" width="100%" placeholderText="Search" />
			<Stack direction="row" spacing={1}>
				<Button
					variant="outlined"
					onClick={() => setModalOpen(true)}
					startIcon={<FilterAltIcon />}
					size="small"
					fullWidth
				>
					Filter
				</Button>
				<TextField
					size="small"
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
					fullWidth
					select
					sx={{
						textAlign: 'center',
						'& .MuiOutlinedInput-root': {
							'& fieldset': { color: 'red' },
						},
					}}
					SelectProps={{
						displayEmpty: true,
					}}
				>
					<MenuItem key="sort" value="" disabled>
						Sort
					</MenuItem>
					<MenuItem key="newest" value="newest">
						Newest
					</MenuItem>
					<MenuItem key="oldest" value="oldest">
						Oldest
					</MenuItem>
				</TextField>
			</Stack>
			<Divider />
		</>
	);
};

export default LibraryFilters;
