import { Stack } from '@mui/material';
import LibraryFilters from '../components/filter/Filter';
import LibraryCards from '../components/layout/FinderCards';
import { useState } from 'react';
import FilterModal from '../components/filter/FilterModal';
import { FILTERS, getLevels } from '../config/filters';
import View from '../components/layout/View';

const LibraryWorksheetSearch = () => {
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

	return (
		<View
			maxHeight={80}
			headerText="Worksheet Finder"
			body={
				<Stack spacing={1}>
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

					<LibraryFilters
						sortOption={sortOptions}
						setSortOption={setSortOptions}
						setModalOpen={setIsModalOpen}
					/>
					<LibraryCards />
				</Stack>
			}
		/>
	);
};

export default LibraryWorksheetSearch;
