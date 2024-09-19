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

interface SortModalProps {
	sortOptions: {[type: string]: (number)};
	handleChange: (type: string, sort: number) => void
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
						label='Level'
						value={sortOptions.level || ''}
						onChange={(event) => handleChange('level', Number(event.target.value))}
					>
						<MenuItem key={'$level-none'} value=''>
							None
						</MenuItem>
						<MenuItem key={'level-highest'} value={1}> 
							Highest
						</MenuItem>
						<MenuItem key={'level-Lowest'} value={2}>
							Lowest
						</MenuItem>
					</TextField>
					<TextField
						key={`$time-select`}
						fullWidth
						select
						label='Time'
						value={sortOptions.time || ''}
						onChange={(event) => handleChange('time', Number(event.target.value))}
					>
						<MenuItem key={'$time-none'} value=''>
							None
						</MenuItem>
						<MenuItem key={'time-Earliest'} value={2}>
							Earliest
						</MenuItem>
						<MenuItem key={'time-Latest'} value={1}>
							Latest
						</MenuItem>
					</TextField>
					<TextField
						key={`$day-select`}
						fullWidth
						select
						label='Day'
						value={sortOptions.day || ''}
						onChange={(event) => handleChange('day', Number(event.target.value))}
					>
						<MenuItem key={'$day-none'} value=''>
							None
						</MenuItem>
						<MenuItem key={'day-recent'} value={2}>
							{'Start (Mon)'}
						</MenuItem>
						<MenuItem key={'day-oldest'} value={1}>
							{'End (Sun)'}
						</MenuItem>
					</TextField>
					<TextField
						key={`$session-select`}
						fullWidth
						select
						label={'Session'}
						value={sortOptions.session || ''}
						onChange={(event) => handleChange('session', Number(event.target.value))}
					>
						<MenuItem key={'$session-none'} value=''>
							None
						</MenuItem>
						<MenuItem key={'session-recent'} value={1}>
							{'Start (Spring)'}
						</MenuItem>
						<MenuItem key={'session-oldest'} value={2}>
							{'End (Winter)'}
						</MenuItem>
					</TextField>
					<TextField
						key={`$createdOn-select`}
						fullWidth
						select
						label='Created At'
						value={sortOptions.createdAt || 1}
						onChange={(event) => handleChange('createdAt', Number(event.target.value))}
					>
						<MenuItem key={'createdAt-recent'} value={1}>
							{'Newest'}
						</MenuItem>
						<MenuItem key={'createdAt-oldest'} value={2}>
							{'Oldest'}
						</MenuItem>
					</TextField>
				</Stack>
			</Paper>
		</Modal>
	);
};

export default SortModal;
