import { Paper, Box, Typography, ButtonBase, Divider } from '@mui/material';

type WorksheetCard = {
	level: string;
	session: string;
	day: string;
	time: string;
	year: string;
	createdOn: string;
};

const WorksheetCard = ({
	level,
	session,
	day,
	time,
	year,
	createdOn,
}: WorksheetCard) => {
	return (
		<ButtonBase sx={{width: '100%', textAlign: 'left'}}>
			<Paper elevation={2} sx={{width: '100%'}}>
				<Box p={2}>
					<Typography variant="h6">{level}</Typography>
          <Divider />
					<Typography variant="body1">
						{session} {year}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{day} {time}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Created on: {createdOn}
					</Typography>
				</Box>
			</Paper>
		</ButtonBase>
	);
};

export default WorksheetCard;
