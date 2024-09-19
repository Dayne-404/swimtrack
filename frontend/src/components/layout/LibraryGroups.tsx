import { Box, Typography } from '@mui/material';
import GroupCards from './GroupCards';

interface LibraryGroupsProps {
	headerText?: string;
}

const LibraryGroups = ({ headerText }: LibraryGroupsProps) => {
	return (
		<Box width="100%">
			{headerText && <Typography variant="h6">{headerText}</Typography>}
			<GroupCards limit={4} displayNumGroups={false} />
		</Box>
	);
};

export default LibraryGroups;
