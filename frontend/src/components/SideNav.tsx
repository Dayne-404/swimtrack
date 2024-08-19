import {
	Drawer,
	Box,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	List,
	Stack,
	Avatar,
	Typography,
	IconButton,
  ButtonBase,
} from '@mui/material';

import SpeedIcon from '@mui/icons-material/Speed';
import FolderIcon from '@mui/icons-material/Folder';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import GroupIcon from '@mui/icons-material/Group';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 264;

const sideNavLocations = {
	Dashboard: <SpeedIcon />,
	Worksheets: <FolderIcon />,
	Groups: <GroupIcon />,
	Meetings: <CameraAltIcon />,
	Programs: <ScubaDivingIcon />,
};

export const SideNav = () => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,

				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					pt: '5rem',
					height: '100vh',
					display: 'flex',
					justifyContent: 'space-between',
					boxSizing: 'border-box',
				},
			}}
		>
			<Box p={1} textAlign="center">
				<List>
					{Object.entries(sideNavLocations).map(([text, icon]) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>{icon}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>

			<Stack
				direction="row-reverse"
				justifyContent="space-between"
				p={1.5}
			>
				<IconButton size="large" sx={{ flexGrow: 0 }}>
					<SettingsIcon />
				</IconButton>
				<ButtonBase
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: '0.5rem',
            textAlign: 'left',
            p: '0.2rem',
					}}
				>
					<Avatar>DD</Avatar>
					<Stack>
						<Typography variant="subtitle1" mb={-0.4}>
							Dayne
						</Typography>
						<Typography variant="body2" color="grey" mb={0.4}>
							View profile
						</Typography>
					</Stack>
				</ButtonBase>
			</Stack>
		</Drawer>
	);
};

export default SideNav;
