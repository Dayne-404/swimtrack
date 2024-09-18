import { Paper, Box, Typography, ButtonBase, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../helper/formatDate';
import { Worksheet } from '../../config/worksheetType';
import { WORKSHEET_VALUES } from '../../config/worksheetData';

interface WorksheetCardProps {
	worksheet: Worksheet;
	IncludeInstructor?: boolean;
	IncludeUpdatedAt?: boolean;
	onClick?: () => void;
	disabled?: boolean;
	selected?: boolean;
}

const WorksheetCardSelectedSx = {
	width: '100%',
	backgroundColor: 'grey.300',
	transition: 'background-color 0.3s',
};

const WorksheetCard = ({
	worksheet,
	IncludeInstructor = false,
	IncludeUpdatedAt = false,
	onClick,
	disabled = false,
	selected = false,
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
			onClick={() => (onClick ? onClick() : navigate(_id))}
			disabled={disabled}
		>
			<Paper
				elevation={2}
				sx={
					selected
						? WorksheetCardSelectedSx
						: { width: '100%', transition: 'background-color 0.3s' }
				}
			>
				<Box p={2}>
					<Typography variant="h6">
						{WORKSHEET_VALUES.levels.names[level]}
					</Typography>
					<Divider />
					{IncludeInstructor && (
						<Typography variant="body1">
							Instructor:{' '}
							{typeof instructor === 'string'
								? instructor
								: instructor.name}
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
