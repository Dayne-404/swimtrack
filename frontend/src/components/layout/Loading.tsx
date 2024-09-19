import { Stack, CircularProgress } from "@mui/material";

const Loading = () => {
	return (
		<Stack width="100%" alignItems="center" pt={5}>
			<CircularProgress size={60} />
		</Stack>
	);
};

export default Loading;
