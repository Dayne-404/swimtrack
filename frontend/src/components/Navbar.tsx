import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
    Stack,
} from '@mui/material';
import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';

const Navbar = () => {
	return (
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: 'white',
				color: 'black',
				boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
                zIndex: (theme) => theme.zIndex.drawer + 1
			}}
		>
			<Toolbar>
                <Stack direction='row' alignItems='center' width={240}>
                    <IconButton size="large" edge="start" color="primary">
                        <PoolOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1, fontWeight: 700, fontSize: '1.75rem' }}
                    >
                        SwimTrack
                    </Typography>
                </Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
