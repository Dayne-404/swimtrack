import {
	Avatar,
	Stack,
	IconButton,
	ButtonBase,
	Typography,
	useTheme,
	SxProps,
	Theme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SettingsIcon from '@mui/icons-material/Settings';

const ProfileCard = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	const buttonBaseStyle: SxProps<Theme> = {
		display: 'flex',
		flexDirection: 'row',
		gap: theme.spacing(1),
		padding: theme.spacing(0.5),
		flexGrow: 1,
		justifyContent: 'flex-start',
	};

	const nameTextStyle: SxProps<Theme> = {
		fontSize: {
			xs: '1rem',
			sm: '1rem',
		},
	};

	const profileTextStyle: SxProps<Theme> = {
		fontSize: {
			xs: '0.75rem',
			sm: '0.75rem',
		},
		color: theme.palette.text.secondary,
	};

	return (
		<Stack direction="row" p={1.5}>
			<ButtonBase
				sx={buttonBaseStyle}
				onClick={() => navigate('/profile')}
			>
				<Avatar>DD</Avatar>
				<Stack>
					<Typography variant="subtitle1" sx={nameTextStyle}>
						Dayne
					</Typography>
					<Typography variant="body2" sx={profileTextStyle}>
						View profile
					</Typography>
				</Stack>
			</ButtonBase>
			<IconButton size="large" onClick={() => navigate('/settings')}>
				<SettingsIcon />
			</IconButton>
		</Stack>
	);
};

export default ProfileCard;
