import { Paper, Modal, Stack, Typography, Divider, IconButton, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface InfoModalProps {
	headerText: string;
	body: React.ReactElement;
	isOpen?: boolean;
}

const InfoModal = ({ headerText, body, isOpen = true }: InfoModalProps) => {
	const [open, setOpen] = useState<boolean>(isOpen);

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
					width: '85%',
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
