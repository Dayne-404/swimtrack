import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Stack,
	useTheme,
	ButtonBase,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

type NavbarProps = {
	isMediumOrBelow: boolean;
	height: number;
	onDrawerToggle: () => void;
};

const Navbar = ({ isMediumOrBelow, onDrawerToggle, height }: NavbarProps) => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<AppBar
			sx={{
				backgroundColor: 'white',
				color: 'black',
				boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
				zIndex: theme.zIndex.drawer + 1,
				height: height + 'px',
			}}
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					position: 'relative',
					height: '100%',
				}}
			>
				{isMediumOrBelow && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={onDrawerToggle}
					>
						<MenuIcon />
					</IconButton>
				)}

				<Stack
					direction="row"
					alignItems="center"
					justifyContent={isMediumOrBelow ? 'center' : 'flex-start'}
				>
					<ButtonBase disableRipple onClick={() => navigate('/')}>
						<PoolOutlinedIcon
							fontSize={isMediumOrBelow ? 'medium' : 'large'}
							color="primary"
						/>
						<Typography
							variant="h4"
							component="div"
							sx={{
								fontWeight: 700,
								fontSize: isMediumOrBelow
									? '1.25rem'
									: '1.75rem',
								textAlign: 'center',
							}}
						>
							SwimTrack
						</Typography>
					</ButtonBase>
				</Stack>

				<Stack direction="row" spacing={isMediumOrBelow ? 0 : 2}>
					<IconButton color="inherit" aria-label="notifications">
						<NotificationsIcon />
					</IconButton>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
