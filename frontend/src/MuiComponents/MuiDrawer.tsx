import { Drawer, Typography, Box, IconButton } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
const MuiDrawer = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	return (
		<>
			<IconButton
				size="large"
				edge="start"
				color="inherit"
				onClick={() => setIsDrawerOpen(true)}
			>
				<MenuIcon />
			</IconButton>
			<Drawer
				anchor="left"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			>
				<Box width="250px" p={2} textAlign="center" role="presentation">
					<Typography variant="h6">Side Panel</Typography>
				</Box>
			</Drawer>
		</>
	);
};

export default MuiDrawer;
