import {
	Modal,
	Paper,
	Stack,
	Typography,
	IconButton,
	Divider,
	TextField,
	ButtonBase,
	useTheme,
} from '@mui/material';
import FilterComponent from '../components/FilterComponent';
import ActiveFilters from '../components/ActiveFilters';
import CloseIcon from '@mui/icons-material/Close';

interface Filters {
	sessions: string[];
	locations: string[];
	days: string[];
}

interface FilterModalProps {
	filters: Filters;
	levels: string[];
	selectedFilters: string[];
	isModalOpen: boolean;
	handleModalClose: () => void;
	handleFilterSelect: (filter: string) => void;
	handleFilterRemove: (filter: string) => void;
	clearFilters: () => void;
}

const FilterModal = ({
	filters,
	levels,
	selectedFilters,
	isModalOpen,
	handleModalClose,
	handleFilterSelect,
	handleFilterRemove,
	clearFilters,
}: FilterModalProps) => {
	const theme = useTheme();

	return (
		<Modal open={isModalOpen} onClose={handleModalClose}>
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
						availableFilters={levels}
						onFiltersChange={handleFilterSelect}
					/>
					<Stack direction="row" spacing={1}>
						<FilterComponent
							size="medium"
							placeholder="Session"
							selectedFilters={selectedFilters}
							availableFilters={filters.sessions}
							onFiltersChange={handleFilterSelect}
						/>
						<FilterComponent
							size="medium"
							placeholder="Location"
							selectedFilters={selectedFilters}
							availableFilters={filters.locations}
							onFiltersChange={handleFilterSelect}
						/>
					</Stack>
					<Stack direction="row" spacing={1}>
						<FilterComponent
							size="medium"
							placeholder="Day"
							selectedFilters={selectedFilters}
							availableFilters={filters.days}
							onFiltersChange={handleFilterSelect}
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
					<ButtonBase onClick={clearFilters} disableRipple>
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
	);
};

export default FilterModal;
