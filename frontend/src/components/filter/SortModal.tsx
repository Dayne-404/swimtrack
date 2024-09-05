import {
	Modal,
	Paper,
	TextField,
	MenuItem,
	Stack,
	Typography,
	IconButton,
	Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SortOptions {
	level: 'recent' | 'oldest' | '';
	time: 'recent' | 'oldest' | '';
	day: 'recent' | 'oldest' | '';
	session: 'recent' | 'oldest' | '';
	createdAt: 'recent' | 'oldest';
}

interface SortModalProps {
	sortOptions: SortOptions;
	handleChange: (
		key: keyof SortOptions
	) => (event: React.ChangeEvent<HTMLInputElement>) => void;
	isModalOpen: boolean;
	handleModalClose: () => void;
}

const SortModal = ({
	sortOptions,
	handleChange,
	isModalOpen,
	handleModalClose,
}: SortModalProps) => {
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
					width: '85%',
					overflow: 'auto',
				}}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					mb={1}
				>
					<Typography variant="h5">Sort</Typography>
					<IconButton onClick={handleModalClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Divider />

				<Stack spacing={1.5} py={1.5}>
					<TextField
						key={`$level-select`}
						fullWidth
						select
						label={'Level'}
						value={sortOptions.level}
						onChange={handleChange('level')}
					>
						<MenuItem key={'$level-none'} value="">
							None
						</MenuItem>
						<MenuItem key={'level-oldest'} value="oldest">
							Highest
						</MenuItem>
						<MenuItem key={'level-recent'} value="recent">
							Lowest
						</MenuItem>
					</TextField>
					<TextField
						key={`$time-select`}
						fullWidth
						select
						label={'time'}
						value={sortOptions.time}
						onChange={handleChange('time')}
					>
						<MenuItem key={'$time-none'} value="">
							None
						</MenuItem>
						<MenuItem key={'time-recent'} value="recent">
							Recent
						</MenuItem>
						<MenuItem key={'time-oldest'} value="oldest">
							Oldest
						</MenuItem>
					</TextField>
					<TextField
						key={`$day-select`}
						fullWidth
						select
						label={'day'}
						value={sortOptions.day}
						onChange={handleChange('day')}
					>
						<MenuItem key={'$day-none'} value="">
							None
						</MenuItem>
						<MenuItem key={'day-recent'} value="recent">
							{'Start (Mon)'}
						</MenuItem>
						<MenuItem key={'day-oldest'} value="oldest">
							{'End (Sun)'}
						</MenuItem>
					</TextField>
					<TextField
						key={`$session-select`}
						fullWidth
						select
						label={'session'}
						value={sortOptions.session}
						onChange={handleChange('session')}
					>
						<MenuItem key={'$session-none'} value="">
							None
						</MenuItem>
						<MenuItem key={'session-recent'} value="recent">
							{'Start (Spring)'}
						</MenuItem>
						<MenuItem key={'session-oldest'} value="oldest">
							{'End (Winter)'}
						</MenuItem>
					</TextField>
					<TextField
						key={`$createdAt-select`}
						fullWidth
						select
						label={'createdAt'}
						value={sortOptions.createdAt}
						onChange={handleChange('createdAt')}
					>
						<MenuItem key={'createdAt-recent'} value="recent">
							{'Recent'}
						</MenuItem>
						<MenuItem key={'createdAt-oldest'} value="oldest">
							{'Oldest'}
						</MenuItem>
					</TextField>
				</Stack>
			</Paper>
		</Modal>
	);
};

export default SortModal;
