import { Paper, Box, Typography, ButtonBase, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../helper/formatDate';
import { Worksheet } from '../../config/worksheetType';
import { WORKSHEET_VALUES } from '../../config/worksheetData';

interface WorksheetCardProps {
	worksheet: Worksheet;
	IncludeInstructor?: boolean;
	IncludeUpdatedAt?: boolean;
}

const WorksheetCard = ({
	worksheet,
	IncludeInstructor = false,
	IncludeUpdatedAt = false,
}: WorksheetCardProps) => {
	const navigate = useNavigate();

	const {
		_id,
		instructor,
		level,
		session,
		location,
		day,
		time,
		year,
		createdAt,
		updatedAt,
	} = worksheet;

	return (
		<ButtonBase
			sx={{ width: '100%', textAlign: 'left' }}
			onClick={() => navigate(_id)}
		>
			<Paper elevation={2} sx={{ width: '100%' }}>
				<Box p={2}>
					<Typography variant="h6">
						{WORKSHEET_VALUES.levels.names[level]}
					</Typography>
					<Divider />
					{IncludeInstructor && (
						<Typography variant="body1">
							Instructor: {instructor}
						</Typography>
					)}
					<Typography variant="body1">
						{WORKSHEET_VALUES.sessions[session]} {year}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{WORKSHEET_VALUES.locations[location]}{' '}
						{WORKSHEET_VALUES.days[day]} {time}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Created on: {formatDate(createdAt)}
					</Typography>
					{IncludeUpdatedAt && (
						<Typography variant="body2" color="text.secondary">
							Last Updated: {formatDate(updatedAt)}
						</Typography>
					)}
				</Box>
			</Paper>
		</ButtonBase>
	);
};

export default WorksheetCard;
