import { Box, Typography, Stack, Divider, Grid, Paper } from '@mui/material';

const MuiLayout = () => {
	const boxStyling = {
		backgroundColor: 'primary.main',
		color: 'white',
		height: '100px',
		width: '100px',
		padding: '16px',
		'&:hover': {
			backgroundColor: 'primary.light',
		},
	};

	return (
		<Paper sx={{padding: '12px'}} elevation={4}>
			<Stack
				border={1}
				direction="row"
				spacing={2}
				divider={<Divider orientation="vertical" flexItem />}
				padding={3}
			>
				<Box sx={boxStyling}>
					<Typography>MuiLayout</Typography>
				</Box>
				<Box
					height="100px"
					width="100px"
					padding="16px"
					bgcolor="success.light"
					display="flex"
					color="white"
				>
					<Typography>MuiLayout</Typography>
				</Box>
			</Stack>
			<Grid container my={2} rowSpacing={1} columnSpacing={2}>
				<Grid item xs={12} sm={6} md={3}>
					<Box bgcolor="primary.light" p={2}>
						Item 1
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Box bgcolor="primary.light" p={2}>
						Item 2
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Box bgcolor="primary.light" p={2}>
						Item 3
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Box bgcolor="primary.light" p={2}>
						Item 4
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default MuiLayout;
