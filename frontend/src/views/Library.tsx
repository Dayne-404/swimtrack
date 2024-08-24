import {
	Paper,
	Box,
	Typography,
	Divider,
	Stack,
	Button,
	MenuItem,
	TextField,
	Modal,
	IconButton,
	ButtonBase,
	useTheme,
} from '@mui/material';
import SearchBar from '../components/SearchBar';
import { useState } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ActiveFilters from '../components/ActiveFilters';
import CloseIcon from '@mui/icons-material/Close';

const Library = () => {
	const theme = useTheme();
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
	const [sortOption, setSortOption] = useState<string>('');
	const [modalOpen, setModalOpen] = useState<boolean>(true);

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

	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<Box>
			<Modal open={modalOpen} onClose={handleModalClose}>
				<Paper
					elevation={0}
					sx={{
						position: 'absolute',
						p: 2,
						boxSizing: 'border-box',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '95%',
						height: '90vh',
						overflow: 'scroll',
					}}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						mb={1}
					>
						<Typography variant="h5">Filters</Typography>
						<IconButton onClick={handleModalClose}>
							<CloseIcon />
						</IconButton>
					</Stack>
					<Divider />
					<Stack mt={3} mb={3} spacing={2}>
						<FilterComponent
							size="medium"
							placeholder="Level"
							selectedFilters={selectedFilters}
							availableFilters={availableFilters}
							onFiltersChange={handleFiltersChange}
						/>
						<Stack direction="row" spacing={1}>
							<FilterComponent
								size="medium"
								placeholder="Session"
								selectedFilters={selectedFilters}
								availableFilters={availableFilters}
								onFiltersChange={handleFiltersChange}
							/>

							<FilterComponent
								size="medium"
								placeholder="Location"
								selectedFilters={selectedFilters}
								availableFilters={availableFilters}
								onFiltersChange={handleFiltersChange}
							/>
						</Stack>
						<Stack direction="row" spacing={1}>
							<FilterComponent
								size="medium"
								placeholder="Day"
								selectedFilters={selectedFilters}
								availableFilters={availableFilters}
								onFiltersChange={handleFiltersChange}
							/>
							<TextField
								size="medium"
								placeholder="Time"
								fullWidth
								sx={{
									'& .MuiInputBase-input::placeholder': {
										color: theme.palette.text.secondary,
										opacity: 1, 
									},
								}}
							/>
						</Stack>
					</Stack>
					<Divider />
					<Stack
						mt={2.5}
						direction="row"
						justifyContent="space-between"
						alignItems={'center'}
					>
						<Typography variant="h6" fontWeight="400">
							Active Filters
						</Typography>
						<ButtonBase disableRipple>
							<Typography
								variant="body2"
								fontWeight="400"
								color="primary"
							>
								Clear Filters
							</Typography>
						</ButtonBase>
					</Stack>
					<ActiveFilters
						filters={selectedFilters}
						onRemoveFilter={handleFilterRemove}
					/>
				</Paper>
			</Modal>
			<Typography variant="h5" gutterBottom>
				Library
			</Typography>
			<Paper>
				<Stack height="80vh" p={1.5} spacing={1} boxSizing="border-box">
					<SearchBar
						size="small"
						width="100%"
						placeholderText="Search"
					></SearchBar>
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
				</Stack>
			</Paper>
		</Box>
	);
};

export default Library;
