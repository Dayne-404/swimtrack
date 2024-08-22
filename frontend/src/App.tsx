import {
	createTheme,
	colors,
	ThemeProvider,
	Box,
	useMediaQuery,
} from '@mui/material';
import './styles/fonts.css';
import Navigation from './components/Navigation';
import Dashboard from './views/Dashboard';

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
			<Navigation
				isMediumOrBelow={isMediumOrBelow}
				navbarHeight={navbarHeight}
				smallSideNavWidth={smallSideNavWidth}
				largeSideNavWidth={largeSideNavWidth}
			/>
			<Box
				component="main"
				width="100%"
				height="100vh"
				boxSizing="border-box"
				p={
					isMediumOrBelow
						? navbarHeight + 16 + 'px 16px 16px 16px'
						: navbarHeight +
						  24 +
						  'px 24px 24px ' +
						  (largeSideNavWidth + 24) +
						  'px'
				}
			>
				<Dashboard />
			</Box>
		</ThemeProvider>
	);
}

export default App;
