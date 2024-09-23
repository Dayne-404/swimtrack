import { Typography } from '@mui/material';

interface ViewHeaderProps {
	text: string;
}

const ViewHeader = ({ text }: ViewHeaderProps) => {
	return <Typography variant="h5" gutterBottom> {text} </Typography>;
};

export default ViewHeader;
