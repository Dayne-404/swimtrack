import {Paper } from '@mui/material';

interface SectionHeaderProps {
	body?: React.ReactElement;
	maxHeight?: number;
	flex?: number;
}

const View = ({
	body,
	flex = 1,
	maxHeight,
}: SectionHeaderProps) => {
	const paperStyle = {
		display: 'flex',
		padding: 1.5,
		maxHeight: maxHeight ? `${maxHeight}vh` : 'none',
		flex: flex,
	};

	return <Paper sx={paperStyle}>{body}</Paper>;
};

export default View;
