import { Avatar, AvatarGroup, Stack } from '@mui/material';

const MuiAvatar = () => {
	return (
		<Stack spacing={4}>
			<Stack spacing={1} direction="row">
				<Avatar sx={{ backgroundColor: 'primary.light' }}>DD</Avatar>
				<Avatar sx={{ backgroundColor: 'success.light' }}>EC</Avatar>
				<Avatar sx={{ backgroundColor: 'warning.light' }}>ND</Avatar>
			</Stack>
			<Stack spacing={1} direction="row">
				<AvatarGroup>
					<Avatar src="https://randomuser.me/api/portraits/women/79.jpg" />
					<Avatar src="https://randomuser.me/api/portraits/men/51.jpg" />
					<Avatar sx={{ backgroundColor: 'warning.light' }}>
						ND
					</Avatar>
				</AvatarGroup>
			</Stack>
		</Stack>
	);
};

export default MuiAvatar;
