import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
	SxProps,
	Theme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

type SideNavItemProps = {
	icon: React.ReactNode;
	label: string;
	to: string;
};

const SideNavItem = ({ label, icon, to }: SideNavItemProps) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation();

	const itemButtonStyle: SxProps<Theme> = {
		color: location.pathname === to ? theme.palette.primary.main : 'black',
	};

	const itemIconStyle: SxProps<Theme> = {
		color: location.pathname === to ? theme.palette.primary.main : 'black',
	};

	const itemTextStyle: SxProps<Theme> = {
		typography: {
			xs: 'body2',
			sm: 'body1',
			md: 'h6',
		},
	};

	return (
		<ListItem disablePadding>
			<ListItemButton
				onClick={() => navigate(to)}
				selected={location.pathname === to}
				sx={itemButtonStyle}
			>
				<ListItemIcon sx={itemIconStyle}>
					{icon}
				</ListItemIcon>
				<ListItemText primary={label} sx={itemTextStyle} />
			</ListItemButton>
		</ListItem>
	);
};

export default SideNavItem;
