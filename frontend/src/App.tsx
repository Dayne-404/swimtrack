import {
	createTheme,
	colors,
	ThemeProvider,
	Box,
	useMediaQuery,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/fonts.css';
import Navigation from './components/Navigation';
import Dashboard from './views/Dashboard';
import Library from './views/Library';
import Create from './views/Create';
import { Groups } from './views/Groups';
import WorksheetGroups from './components/WorksheetGroups';

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
	const isMediumOrBelow = useMediaQuery(theme.breakpoints.down('md'));

	const smallSideNavWidth = 200;
	const largeSideNavWidth = 260;

	const navbarHeight = 70;

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navigation
					isMediumOrBelow={isMediumOrBelow}
					navbarHeight={navbarHeight}
					smallSideNavWidth={smallSideNavWidth}
					largeSideNavWidth={largeSideNavWidth}
				/>
				<Box
					display='flex'
					flexDirection='column'
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
						<Route path='/' element={<Dashboard />} />
						<Route path='/library' element={<Library />} />
						<Route path='/library/groups' element={<WorksheetGroups fullPage />} />
						<Route path='/library/groups/:groupId' element={<Groups />} />
						<Route path='/create' element={<Create />} />
						<Route path='/saved' element={<Dashboard />} />
						<Route path='/programs' element={<Dashboard />} />
						<Route path='/profile' element={<Dashboard />} />
						<Route path='/settings' element={<Dashboard />} />
					</Routes>
				</Box>
			</Router>
		</ThemeProvider>
	);
}

export default App;
