import { Paper, Box, Typography, Divider, Stack } from '@mui/material';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import FilterComponent from '../components/FilterComponent';
import ActiveFilters from '../components/ActiveFilters';

const Library = () => {
	const initialFilters = [
		'Filter 1',
		'Filter 2',
		'Filter 3',
		'Filter 4',
		'Filter 5',
	];
	const [availableFilters, setAvailableFilters] =
		useState<string[]>(initialFilters);
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	const handleFiltersChange = (newFilters: string[]) => {
		setSelectedFilters(newFilters);
		setAvailableFilters(
			initialFilters.filter((filter) => !newFilters.includes(filter))
		);
	};

	const handleFilterRemove = (filter: string) => {
		setSelectedFilters(
			selectedFilters.filter((selected) => selected !== filter)
		);
		setAvailableFilters([...availableFilters, filter]);
	};

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				Worksheet Search
			</Typography>
			<Paper>
				<Stack height="70vh" p={4} spacing={2}>
					<SearchBar
						size="medium"
						width="70%"
						placeholderText="Filter by name"
					></SearchBar>
					<Divider />
					<Stack direction="row" spacing={2}>
						<FilterComponent
                            placeholder='Level'
                            size='small'
							availableFilters={availableFilters}
							selectedFilters={selectedFilters}
							onFiltersChange={handleFiltersChange}
						/>
						<FilterComponent
                            placeholder='Session'
                            size='small'
							availableFilters={availableFilters}
							selectedFilters={selectedFilters}
							onFiltersChange={handleFiltersChange}
						/>
						<FilterComponent
                            placeholder='Year'
                            size='small'
							availableFilters={availableFilters}
							selectedFilters={selectedFilters}
							onFiltersChange={handleFiltersChange}
						/>		
						<FilterComponent
                            placeholder='Day'
                            size='small'
							availableFilters={availableFilters}
							selectedFilters={selectedFilters}
							onFiltersChange={handleFiltersChange}
						/>		
						<FilterComponent
                            placeholder='Location'
                            size='small'
							availableFilters={availableFilters}
							selectedFilters={selectedFilters}
							onFiltersChange={handleFiltersChange}
						/>		
					</Stack>
                    <Divider />
					<ActiveFilters
						filters={selectedFilters}
						onRemoveFilter={handleFilterRemove}
					/>
                    
				</Stack>
                
			</Paper>
		</Box>
	);
};

export default Library;
