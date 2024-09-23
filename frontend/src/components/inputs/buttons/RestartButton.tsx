import { Stack, Button } from "@mui/material";
import RedoIcon from '@mui/icons-material/Redo';

const RestartButton = () => {
	return (
		<Stack direction="row-reverse">
			<Button variant="outlined" startIcon={<RedoIcon />}>
				Restart
			</Button>
		</Stack>
	);
};

export default RestartButton;
