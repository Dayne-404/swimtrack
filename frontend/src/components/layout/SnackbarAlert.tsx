import { Alert, Snackbar, SnackbarCloseReason } from '@mui/material';
import { AlertType } from '../../config/alertType';

interface SnackbarAlertProps {
	autoHideDuration?: number;
	open: boolean;
	severity?: 'success' | 'error';
	message: string | null;
	setState: React.Dispatch<React.SetStateAction<AlertType>>;
}

const SnackbarAlert = ({
	open,
	message,
	severity = 'error',
	setState,
	autoHideDuration = 6000,
}: SnackbarAlertProps) => {
	const handleClose = (
		_event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setState((prevValues) => ({
			...prevValues,
			open: false,
		}));
	};
	return (
		<Snackbar
			open={open}
			onClose={handleClose}
			autoHideDuration={autoHideDuration}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert
				variant="filled"
				severity={severity}
				sx={{ width: '100%' }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarAlert;
