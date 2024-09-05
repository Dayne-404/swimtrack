import { Paper, Modal, Stack, Typography, Divider } from '@mui/material';

interface InfoModalProps {
  headerText: string;
  body: React.ReactElement;
  open?: boolean;
}

const InfoModal = ({headerText, body, open = true}: InfoModalProps) => {
	return (
		<Modal open={open}>
			<Paper
				elevation={0}
				sx={{
					position: 'absolute',
					boxSizing: 'border-box',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<Stack px={4} py={4} spacing={1} maxWidth='30rem'>
          <Typography variant='h5'>{headerText}</Typography>
          <Divider />
          {body}
        </Stack>
			</Paper>
		</Modal>
	);
};

export default InfoModal;
