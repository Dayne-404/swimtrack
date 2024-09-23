import { Paper, Modal, Stack, Typography, Divider, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface InfoModalProps {
	headerText: string;
	body: React.ReactElement;
	open?: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoModal = ({ headerText, body, setOpen, open = true }: InfoModalProps) => {
	return (
		<Modal open={open}>
			<Paper
				elevation={0}
				sx={{
					position: 'absolute',
					p: 2,
					boxSizing: 'border-box',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: {
						xs: '90%',
						md: '60%',
						lg: '40%',
					},
				}}
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					mb={1}
				>
					<Typography variant="h5">{headerText}</Typography>
					<IconButton onClick={() => setOpen(false)}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Divider />
				{body}
			</Paper>
		</Modal>
	);
};

export default InfoModal;
