import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Stack,
	Button,
	Menu,
	MenuItem,
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';

const MuiNavbar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton size="large" edge="start" color="inherit">
					<CatchingPokemonIcon fontSize="large" />
				</IconButton>
				<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
					POKEMON APP
				</Typography>
				<Stack direction="row" spacing={2}>
					<Button color="inherit">Features</Button>
					<Button color="inherit">Pricing</Button>
					<Button color="inherit">About</Button>
					<Button
						color="inherit"
						id="resources-button"
						onClick={handleClick}
						endIcon={<KeyboardArrowDownIcon />}
					>
						Resources
					</Button>
					<Button color="inherit">Login</Button>
				</Stack>
				<Menu
					id="resources-menu"
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
				>
					<MenuItem onClick={handleClose}>Blog</MenuItem>
					<MenuItem onClick={handleClose}>Podcast</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

export default MuiNavbar;
