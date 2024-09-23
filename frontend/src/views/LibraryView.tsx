import { Stack } from '@mui/material';
import ViewHeader from '../components/layout/main/ViewHeader';

import LibraryWorksheetSearch from './FinderView';

const Library = () => {
	return (
		<Stack width="100%" spacing={2}>
			<ViewHeader text="Library" />
			<LibraryWorksheetSearch defaultInstructorId='66e083d5e781e4ee0b2602e7' />
		</Stack>
	);
};

export default Library;
