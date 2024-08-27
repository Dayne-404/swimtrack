import {
	createTheme,
	colors,
	ThemeProvider,
	Box,
	useMediaQuery,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/fonts.css';
import Navigation from './components/navigation/Navigation';
import Dashboard from './views/DashboardView';
import Library from './views/LibraryView';
import Create from './views/CreateView';
import Finder from './views/FinderView'
import { GroupInspectView } from './views/GroupInspectView';
import GroupView from './views/GroupView';

import SpeedIcon from '@mui/icons-material/Speed';
import FolderIcon from '@mui/icons-material/Folder';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import ScubaDivingIcon from '@mui/icons-material/ScubaDiving';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

const theme = createTheme({
	palette: {
		primary: {
			main: colors.lightBlue[700],
		},
	},
	typography: {
		fontFamily: 'Lexend, Arial, sans-serif',
	},
});

function App() {
	const smallSideNavWidth = 200;
	const largeSideNavWidth = 260;
	const navbarHeight = 70;

	const SIDE_NAV_ROUTES = {
		Dashboard: { icon: <SpeedIcon />, to: '/', element: <Dashboard /> },
		Library: { icon: <FolderIcon />, to: '/library', element: <Library /> },
		Groups: { icon: <FolderSpecialIcon />, to: '/groups', element: <GroupView /> },
		Create: { icon: <EditIcon />, to: '/create', element: <Create /> },
		Finder: { icon: <SearchIcon />, to: '/finder', element: <Finder />},
		Programs: {
			icon: <ScubaDivingIcon />,
			to: '/programs',
			element: <Dashboard />,
		},
	};

	const ROUTES = {
		Settings: {
			icon: <SettingsIcon />,
			to: '/settings',
			element: <Dashboard />,
		},
		Profile: { to: '/profile', element: <Dashboard /> },
	};

	const ALL_ROUTES = {
		...SIDE_NAV_ROUTES,
		...ROUTES,
	}

	const isMediumOrBelow = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navigation
					isMediumOrBelow={isMediumOrBelow}
					navbarHeight={navbarHeight}
					smallSideNavWidth={smallSideNavWidth}
					largeSideNavWidth={largeSideNavWidth}
					routes={SIDE_NAV_ROUTES}
				/>
				<Box
					display="flex"
					flexDirection="column"
					component="main"
					width="100%"
					height="100vh"
					boxSizing="border-box"
					p={
						isMediumOrBelow
							? navbarHeight + 16 + 'px 10px 10px 10px'
							: navbarHeight +
							  24 +
							  'px 24px 24px ' +
							  (largeSideNavWidth + 24) +
							  'px'
					}
				>
					<Routes>
						{Object.values(ALL_ROUTES).map((route, index) => (
							<Route
								key={`route-${index}`}
								path={route.to}
								element={route.element}
							/>
						))}
						<Route
							path="/groups/:groupId"
							element={<GroupInspectView />}
						/>
					</Routes>
				</Box>
			</Router>
		</ThemeProvider>
	);
}

export default App;
