import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';

interface SnackbarState {
	open: boolean;
	message: string;
	severity: 'success' | 'error';
}

interface SnackbarAlertProps {
	autoHideDuration?: number;
	snackbarState: SnackbarState;
	setSnackbarState: React.Dispatch<React.SetStateAction<SnackbarState>>;
}

const SnackbarAlert = ({
	snackbarState,
	setSnackbarState,
	autoHideDuration = 6000,
}: SnackbarAlertProps) => {
	const handleClose = (
		_event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackbarState((prevState) => ({
			...prevState,
			open: false,
		}));
	};
	return (
		<Snackbar
			open={snackbarState.open}
			onClose={handleClose}
			autoHideDuration={autoHideDuration}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert
				variant="filled"
				severity={snackbarState.severity}
				sx={{ width: '100%' }}
			>
				{snackbarState.message}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarAlert;
