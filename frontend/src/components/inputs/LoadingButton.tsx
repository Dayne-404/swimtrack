import { Button, CircularProgress } from '@mui/material';

interface LoadingButtonProps {
	text: string;
	color?: 'primary' | 'error';
    onClick: () => void;
	loading?: boolean;
	disabled?: boolean;
	startIcon?: React.ReactElement;
}

const LoadingButton = ({
	text,
    loading,
	color = 'primary',
	disabled,
	startIcon,
	onClick,
}: LoadingButtonProps) => {
	return (
		<>
			<Button
				variant="outlined"
				color={color}
				startIcon={startIcon}
				onClick={onClick}
				fullWidth
				disabled={loading || disabled}
			>
				{text}
			</Button>
			{loading && (
				<CircularProgress
					size={24}
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: '-7px',
						marginLeft: '-12px',
					}}
				/>
			)}
		</>
	);
};

export default LoadingButton;
