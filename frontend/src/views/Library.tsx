import { Stack, Typography } from '@mui/material';
import { FILTERS, getLevels } from '../config/filters';
import { useState } from 'react';
import FilterModal from '../components/FilterModal';
import LibraryWorksheetSearch from '../components/LibraryWorksheetSearch';
import WorksheetGroups from '../components/WorksheetGroups';

const Library = () => {
	const levels = getLevels();

	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
	const [sortOptions, setSortOptions] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleFilterSelect = (filter: string) => {
		setSelectedFilters([...selectedFilters, filter]);
	};

	const handleFilterRemove = (filter: string) => {
		setSelectedFilters(
			selectedFilters.filter((selected) => selected !== filter)
		);
	};

	const clearFilters = () => {
		setSelectedFilters([]);
	};

	const handleModalClose = () => {
		setIsModalOpen(false);
	};

	const paperStyle = {
		display: 'flex',
		maxHeight: '80vh',
		padding: 1.5,
	};

	return (
		<Stack spacing={2}>
			<FilterModal
				filters={FILTERS}
				levels={levels}
				selectedFilters={selectedFilters}
				isModalOpen={isModalOpen}
				handleModalClose={handleModalClose}
				handleFilterSelect={handleFilterSelect}
				handleFilterRemove={handleFilterRemove}
				clearFilters={clearFilters}
			/>

			<Typography variant="h5">Library</Typography>

			<WorksheetGroups paperStyle={paperStyle} />

			<LibraryWorksheetSearch
				sortOptions={sortOptions}
				setSortOptions={setSortOptions}
				setIsModalOpen={setIsModalOpen}
				paperStyle={paperStyle}
			/>
		</Stack>
	);
};

export default Library;
