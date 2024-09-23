import { Box } from '@mui/material';

import GroupHeader from '../components/layout/GroupHeader';
import ViewHeader from '../components/layout/main/ViewHeader';
import GroupGrid from '../components/layout/grids/GroupGrid';
import { useState } from 'react';
import { useUser } from '../components/hooks/useUser';

const GroupView = () => {
	const [sortOption, setSortOption] = useState<number>(0);
	const { user } = useUser();

	return (
		<Box sx={{ width: '100%', overflowY: 'auto' }}>
			<ViewHeader text="Groups" />
			<GroupHeader
				instructor={user.id}
				sortOption={sortOption}
				setSortOption={setSortOption}
			/>
			<GroupGrid sortOption={sortOption} />
		</Box>
	);
};

export default GroupView;
