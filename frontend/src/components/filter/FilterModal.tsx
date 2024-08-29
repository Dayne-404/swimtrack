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
import FilterSearch from '../inputs/FilterSelect';
import ActiveFilters from './ActiveFilters';
import CloseIcon from '@mui/icons-material/Close';
import { WORKSHEETS, levelNames } from '../../config/levels';

interface FilterModalProps {
	selectedFilters: string[];
	isModalOpen: boolean;
	handleModalClose: () => void;
	handleFilterSelect: (filter: string) => void;
	handleFilterRemove: (filter: string) => void;
	clearFilters: () => void;
}

const FilterModal = ({
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
					overflow: 'auto',
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
					<FilterSearch
						size="medium"
						placeholder="Level"
						selectedFilters={selectedFilters}
						availableFilters={levelNames}
						onFiltersChange={handleFilterSelect}
					/>
					<Stack direction="row" spacing={1}>
						<FilterSearch
							size="medium"
							placeholder="Session"
							selectedFilters={selectedFilters}
							availableFilters={WORKSHEETS.sessions}
							onFiltersChange={handleFilterSelect}
						/>
						<FilterSearch
							size="medium"
							placeholder="Location"
							selectedFilters={selectedFilters}
							availableFilters={WORKSHEETS.locations}
							onFiltersChange={handleFilterSelect}
						/>
					</Stack>
					<Stack direction="row" spacing={1}>
						<FilterSearch
							size="medium"
							placeholder="Day"
							selectedFilters={selectedFilters}
							availableFilters={WORKSHEETS.days}
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
