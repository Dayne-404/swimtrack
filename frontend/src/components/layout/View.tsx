import { Typography, Paper } from '@mui/material';

interface SectionHeaderProps {
	headerText: string;
	body?: React.ReactElement;
	maxHeight?: number;
	flex?: number, 
}

const View = ({ headerText, body, flex=1, maxHeight }: SectionHeaderProps) => {
	const paperStyle = {
		display: 'flex',
		padding: 1.5,
		maxHeight: maxHeight ? `${maxHeight}vh` : 'none',
		flex: flex,
	};

	return (
		<>
			<Typography mb={1.5} variant="h5">
				{headerText}
			</Typography>
			<Paper sx={paperStyle}>{body}</Paper>
		</>
	);
};

export default View;
