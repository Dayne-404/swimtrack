import { Box } from '@mui/material';

import GroupHeader from '../components/layout/GroupHeader';
import ViewHeader from '../components/layout/ViewHeader';
import GroupCards from '../components/layout/GroupCards';


const GroupView = () => {
	return (
		<Box sx={{ width: '100%', overflowY: 'auto' }}>
			<ViewHeader text="Groups" />
			<GroupHeader />
			<GroupCards />
		</Box>
	);
};

export default GroupView;
