import Dashboard from '../views/DashboardView';
import Library from '../views/LibraryView';
import Finder from '../views/FinderView';
import GroupInspect from '../views/GroupInspectView';
import GroupView from '../views/GroupView';
import Create from '../views/CreateView';
import WorksheetInspect from '../views/WorksheetInspectView';

import SpeedIcon from '@mui/icons-material/Speed';
import FolderIcon from '@mui/icons-material/Folder';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileView from '../views/ProfileView';
import ProgramView from '../views/ProgramView';

export const SIDE_NAV_ROUTES = {
	Dashboard: { icon: <SpeedIcon />, to: '/', element: <Dashboard /> },
	Library: { icon: <FolderIcon />, to: '/library', element: <Library /> },
	Groups: {
		icon: <FolderSpecialIcon />,
		to: '/groups',
		element: <GroupView />,
	},
	Create: { icon: <EditIcon />, to: '/create', element: <Create /> },
	Finder: { icon: <SearchIcon />, to: '/finder', element: <Finder /> },
	Programs: {
		icon: <ScubaDivingIcon />,
		to: '/programs',
		element: <ProgramView />,
	},
};

export const SIDE_NAV_BOTTOM_ROUTES = {
	Settings: {
		icon: <SettingsIcon />,
		to: '/settings',
		element: <Dashboard />,
	},
	Profile: { to: '/profile', element: <ProfileView /> },
};

export const EXTRA_ROUTES = {
	GroupInspect: { to: '/groups/:groupId', element: <GroupInspect /> },
	InstructorInspect: {
		to: '/library/:worksheetId',
		element: <WorksheetInspect backText="Library" to="/library" />,
	},
	FinderInspect: {
		to: '/finder/:worksheetId',
		element: <WorksheetInspect backText="Finder" to="/finder" />,
	},
};

export const ALL_ROUTES = {
	...SIDE_NAV_ROUTES,
	...SIDE_NAV_BOTTOM_ROUTES,
	...EXTRA_ROUTES,
};
