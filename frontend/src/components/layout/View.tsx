import { Typography, Paper } from '@mui/material';

interface SectionHeaderProps {
	headerText: string;
	body?: React.ReactElement;
	maxHeight?: number;
}

const View = ({ headerText, body, maxHeight }: SectionHeaderProps) => {
	const paperStyle = {
		display: 'flex',
		padding: 1.5,
		maxHeight: maxHeight ? `${maxHeight}vh` : 'none',
    flex: 1,
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
