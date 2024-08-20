import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Stack,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
	const theme = useTheme();
	const isMediumOrBelow = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: 'white',
				color: 'black',
				boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
				zIndex: theme.zIndex.drawer + 1,
			}}
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: isMediumOrBelow ? 'center' : 'flex-start',
					position: 'relative',
				}}
			>
				{isMediumOrBelow && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						// onClick={handleDrawerToggle}
						sx={{
							position: 'absolute',
							left: theme.spacing(2),
						}}
					>
						<MenuIcon />
					</IconButton>
				)}

				<Stack
					direction="row"
					alignItems="center"
					spacing={1}
					sx={{
						display: 'flex',
						justifyContent: isMediumOrBelow ? 'center' : 'flex-start',
						width: '100%',
						paddingLeft: isMediumOrBelow ? theme.spacing(7) : 0, // Adjust padding for button space on small screens
					}}
				>
					{/* Logo Icon */}
					<IconButton size="large" edge="start" color="primary">
						<PoolOutlinedIcon fontSize="large" />
					</IconButton>

					{/* Text */}
					<Typography
						variant="h4"
						component="div"
						sx={{
							fontWeight: 700,
							fontSize: '1.75rem',
							textAlign: 'center',
						}}
					>
						SwimTrack
					</Typography>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
