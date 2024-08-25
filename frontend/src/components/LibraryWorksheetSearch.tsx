import { Paper, Stack, Typography } from '@mui/material';
import LibraryFilters from '../components/LibraryFilters';
import LibraryCards from '../components/LibraryCards';

interface LibraryWorksheetSearchProps {
	paperStyle: object;
	sortOptions: string;
	setSortOptions: (value: string) => void;
	setIsModalOpen: (value: boolean) => void;
}

const LibraryWorksheetSearch = ({
	paperStyle,
	sortOptions,
	setSortOptions,
	setIsModalOpen,
}: LibraryWorksheetSearchProps) => {
	return (
		<Paper sx={paperStyle}>
			<Stack spacing={1}>
				<Typography variant="h6" fontWeight="400" gutterBottom>
					Worksheet Finder
				</Typography>
				<LibraryFilters
					sortOption={sortOptions}
					setSortOption={setSortOptions}
					setModalOpen={setIsModalOpen}
				/>
				<LibraryCards />
			</Stack>
		</Paper>
	);
};

export default LibraryWorksheetSearch;
