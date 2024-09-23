import { Stack } from '@mui/material';
import ViewHeader from '../components/layout/main/ViewHeader';

import LibraryWorksheetSearch from './FinderView';

const Library = () => {
	return (
		<Stack width="100%" spacing={2}>
			<ViewHeader text="Library" />
			<LibraryWorksheetSearch specificToInstructor />
		</Stack>
	);
};

export default Library;
