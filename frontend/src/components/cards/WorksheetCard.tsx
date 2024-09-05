import { Paper, Box, Typography, ButtonBase, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import capitalizeFirstLetter from '../../helper/capitalizeFirstLetter';
import formatDate from '../../helper/formatDate';
import { LEVELS } from '../../config/levels';

type WorksheetCard = {
	id: string;
	instructor?: string;
	level: string;
	session: string;
	location: string;
	day: string;
	time: string;
	year: string;
	createdOn: string;
};

const WorksheetCard = ({
	id,
	instructor,
	level,
	session,
	location,
	day,
	time,
	year,
	createdOn,
}: WorksheetCard) => {
	const navigate = useNavigate();

	return (
		<ButtonBase
			sx={{ width: '100%', textAlign: 'left' }}
			onClick={() => navigate(id)}
		>
			<Paper elevation={2} sx={{ width: '100%' }}>
				<Box p={2}>
					<Typography variant="h6">
						{LEVELS[level].name}
					</Typography>
					<Divider />
					{instructor && <Typography variant="body1">Instructor: {instructor}</Typography>}
					<Typography variant="body1">
						{capitalizeFirstLetter(session)} {year}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{capitalizeFirstLetter(location)} {capitalizeFirstLetter(day)} {time}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Created on: {formatDate(createdOn)}
					</Typography>
				</Box>
			</Paper>
		</ButtonBase>
	);
};

export default WorksheetCard;
