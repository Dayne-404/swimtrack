import {Paper } from '@mui/material';

interface ViewPaperProps {
	body?: React.ReactElement;
	maxHeight?: number;
	flex?: number;
}

const ViewPaper = ({
	body,
	flex = 1,
	maxHeight,
}: ViewPaperProps) => {
	const paperStyle = {
		display: 'flex',
		padding: 1.5,
		maxHeight: maxHeight ? `${maxHeight}vh` : 'none',
		flex: flex,
	};

	return <Paper sx={paperStyle}>{body}</Paper>;
};

export default ViewPaper;
