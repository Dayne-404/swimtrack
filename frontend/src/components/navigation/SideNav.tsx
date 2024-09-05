import {
	Drawer,
	Box,
	List,
	useMediaQuery,
	useTheme,
} from '@mui/material';

import SideNavItem from './SideNavItem';
import ProfileCard from '../cards/ProfileCard';

type SideNavProps = {
	open: boolean;
	smallWidth: number;
	largeWidth: number;
	routes: object;
	onDrawerToggle: () => void;
};

export const SideNav = ({
	open,
	smallWidth,
	largeWidth,
	onDrawerToggle,
	routes,
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
					{Object.entries(routes).map(([key, {icon, to}]) => (
						<SideNavItem
							key={key}
							label={key}
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
