import { Box } from '@mui/material';

import GroupHeader from '../components/layout/GroupHeader';
import ViewHeader from '../components/layout/ViewHeader';
import GroupCards from '../components/layout/GroupCards';
import { useState } from 'react';

const GroupView = () => {
	const [sortOption, setSortOption] = useState<number>(0);

	return (
		<Box sx={{ width: '100%', overflowY: 'auto' }}>
			<ViewHeader text="Groups" />
			<GroupHeader
				instructor="66e083d5e781e4ee0b2602e7"
				sortOption={sortOption}
				setSortOption={setSortOption}
			/>
			<GroupCards sortOption={sortOption} />
		</Box>
	);
};

export default GroupView;
