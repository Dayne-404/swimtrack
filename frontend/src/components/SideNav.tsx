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
	useMediaQuery,
	useTheme,
} from '@mui/material';

import SpeedIcon from '@mui/icons-material/Speed';
import FolderIcon from '@mui/icons-material/Folder';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import GroupIcon from '@mui/icons-material/Group';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';

type SideNavProps = {
	open: boolean;
	smallWidth: number;
	largeWidth: number;
	onDrawerToggle: () => void;
};

const sideNavLocations = [
	{ label: 'Dashboard', icon: <SpeedIcon /> },
	{ label: 'Worksheets', icon: <FolderIcon /> },
	{ label: 'Groups', icon: <GroupIcon /> },
	{ label: 'Meetings', icon: <CameraAltIcon /> },
	{ label: 'Programs', icon: <ScubaDivingIcon /> },
];

export const SideNav = ({ open, smallWidth, largeWidth, onDrawerToggle, }: SideNavProps) => {
	const theme = useTheme();
	const isMediumOrBelow = useMediaQuery(theme.breakpoints.down('md'));
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleListItemClick = (index: number) => {
		setSelectedIndex(index);
	};

	return (
		<Drawer
			variant={isMediumOrBelow ? 'temporary' : 'permanent'}
			open={isMediumOrBelow ? open : true}
			onClose={isMediumOrBelow ? onDrawerToggle : undefined}
			sx={{
				width: isMediumOrBelow ? smallWidth : largeWidth,
				flexShrink: 0,
				['& .MuiDrawer-paper']: {
					width: isMediumOrBelow ? smallWidth : largeWidth,
					pt: theme.spacing(10),
					height: '100vh',
					display: 'flex',
					justifyContent: 'space-between',
					boxSizing: 'border-box',
				},
			}}
		>
			<Box p={1} textAlign="center">
				<List>
					{sideNavLocations.map(({ label, icon }, index) => (
						<ListItem key={label} disablePadding>
							<ListItemButton
								selected={selectedIndex === index}
								onClick={() => handleListItemClick(index)}
								sx={{
									color:
										selectedIndex === index
											? theme.palette.primary.main
											: 'black',
								}}
							>
								<ListItemIcon
									sx={{
										color:
											selectedIndex === index
												? theme.palette.primary.main
												: 'black',
									}}
								>
									{icon}
								</ListItemIcon>
								<ListItemText
									primary={label}
									sx={{
										typography: {
											xs: 'body2',
											sm: 'body1',
											md: 'h6',
										},
									}}
								/>
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
				<IconButton size="large">
					<SettingsIcon />
				</IconButton>
				<ButtonBase
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						gap: theme.spacing(1),
						textAlign: 'left',
						padding: theme.spacing(0.5),
					}}
				>
					<Avatar>DD</Avatar>
					<Stack>
						<Typography
							variant="subtitle1"
							sx={{
								fontSize: {
									xs: '1rem',
									sm: '1rem',
								},
							}}
						>
							Dayne
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								fontSize: {
									xs: '0.75rem',
									sm: '0.75rem',
								},
							}}
						>
							View profile
						</Typography>
					</Stack>
				</ButtonBase>
			</Stack>
		</Drawer>
	);
};

export default SideNav;
