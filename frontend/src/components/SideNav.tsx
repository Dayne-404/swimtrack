import {
	Drawer,
	Box,
	List,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import SpeedIcon from '@mui/icons-material/Speed';
import FolderIcon from '@mui/icons-material/Folder';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import SideNavItem from './SideNavItem';
import ProfileCard from './ProfileCard';

type SideNavProps = {
	open: boolean;
	smallWidth: number;
	largeWidth: number;
	onDrawerToggle: () => void;
};

const sideNavLocations = [
	{ label: 'Dashboard', icon: <SpeedIcon />, to: '/' },
	{ label: 'Library', icon: <FolderIcon />, to: '/library' },
	{ label: 'Create', icon: <EditIcon />, to: '/create' },
	{ label: 'Saved', icon: <SaveIcon />, to: '/saved' },
	{ label: 'Programs', icon: <ScubaDivingIcon />, to: '/programs' },
];

export const SideNav = ({
	open,
	smallWidth,
	largeWidth,
	onDrawerToggle,
}: SideNavProps) => {
	const theme = useTheme();
	const isMediumOrBelow = useMediaQuery(theme.breakpoints.down('md'));

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
					{sideNavLocations.map(({ label, icon, to }) => (
						<SideNavItem
							key={label}
							label={label}
							icon={icon}
							to={to}
						/>
					))}
				</List>
			</Box>
			
			<ProfileCard />
		</Drawer>
	);
};

export default SideNav;
