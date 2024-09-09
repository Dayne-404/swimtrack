import React, { useState } from 'react';
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
import FilterComponent from '../inputs/FilterSelect';
import ActiveFilters from './ActiveFilters';
import CloseIcon from '@mui/icons-material/Close';
import { WORKSHEET_VALUES } from '../../config/worksheetData';

interface FiltersByType {
	[type: string]: (number | string)[];
}
interface FilterModalProps {
	selectedFilters: FiltersByType;
	isModalOpen: boolean;
	handleModalClose: () => void;
	handleFilterSelect: (type: string, filter: number | string) => void;
	handleFilterRemove: (type: string, filter: number | string) => void;
	clearFilters: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
	selectedFilters,
	isModalOpen,
	handleModalClose,
	handleFilterSelect,
	handleFilterRemove,
	clearFilters,
}) => {
	const theme = useTheme();

	const [time, setTime] = useState<string>('');
	const [timeError, setTimeError] = useState<boolean>(false);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			if (time && /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
				setTimeError(false);
				setTime('');

				if (
					!selectedFilters['time'] ||
					(selectedFilters['time'] &&
						!selectedFilters['time'].includes(time))
				)
					handleFilterSelect('time', time);
			} else {
				setTimeError(true);
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTime(event.target.value);
	};

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
					<FilterComponent
						size="medium"
						placeholder="Level"
						availableFilters={WORKSHEET_VALUES.levels.names}
						selectedFilters={selectedFilters['level'] || []}
						onFiltersChange={(filter) =>
							handleFilterSelect('level', filter)
						}
					/>
					<Stack direction="row" spacing={1}>
						<FilterComponent
							size="medium"
							placeholder="Session"
							availableFilters={WORKSHEET_VALUES.sessions}
							selectedFilters={selectedFilters['session'] || []}
							onFiltersChange={(filter) =>
								handleFilterSelect('session', filter)
							}
						/>
						<FilterComponent
							size="medium"
							placeholder="Location"
							availableFilters={WORKSHEET_VALUES.locations}
							selectedFilters={selectedFilters['location'] || []}
							onFiltersChange={(filter) =>
								handleFilterSelect('location', filter)
							}
						/>
					</Stack>
					<Stack direction="row" spacing={1}>
						<FilterComponent
							size="medium"
							placeholder="Day"
							availableFilters={WORKSHEET_VALUES.days}
							selectedFilters={selectedFilters['day'] || []}
							onFiltersChange={(filter) =>
								handleFilterSelect('day', filter)
							}
						/>
						<TextField
							size="medium"
							placeholder="Time"
							error={timeError}
							helperText={
								timeError ? 'Time must be in HH:MM format' : ''
							}
							fullWidth
							value={time}
							onKeyUp={handleKeyDown}
							onChange={handleChange}
							FormHelperTextProps={{
								sx: {
									position: 'absolute',
									bottom: '-20px',
									left: 10,
									margin: 0,
									fontSize: '0.75rem',
								},
							}}
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
