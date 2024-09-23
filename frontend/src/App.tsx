import {
	createTheme,
	colors,
	ThemeProvider,
	Box,
	useMediaQuery,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

import Navigation from './components/navigation/Navigation';
import SnackbarAlert from './components/modals/SnackbarAlert';

import { ALL_ROUTES, SIDE_NAV_ROUTES } from './config/routes';
import { DEFAULT_SNACKBAR_VALUES, AlertType } from './config/alertType';

import './styles/fonts.css';
import AuthenticatedRoute from './components/hooks/AuthenticatedRoute';
import LoginView from './views/LoginView';
import ViewPaper from './components/layout/main/ViewPaper';
import { UserProvider } from './components/hooks/userProvider';

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

const SMALL_SIDE_WIDTH = 200;
const LARGE_SIDE_WIDTH = 260;
const NAVBAR_HEIGHT = 70;

export const AlertContext = createContext<
	(message: string, severity?: 'success' | 'error') => void
>(() => {});

function App() {
	const isMediumOrBelow = useMediaQuery(theme.breakpoints.down('md'));

	const [snackbarState, setSnackbarState] = useState<AlertType>(
		DEFAULT_SNACKBAR_VALUES
	);

	const showAlert = (
		message: string,
		severity: 'success' | 'error' = 'error'
	) => {
		setSnackbarState({ open: true, message, severity });
	};

	const MainContentSx = {
		display: 'flex',
		flexDirection: 'column',
		component: 'main',
		width: '100%',
		height: '100vh',
		boxSizing: 'border-box',
		padding: {
			xs: `${NAVBAR_HEIGHT + 16}px 10px 10px 10px`,
			md: `${NAVBAR_HEIGHT + 24}px 24px 24px ${LARGE_SIDE_WIDTH + 24}px`,
		},
	};

	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
			<AlertContext.Provider value={showAlert}>
				<Router>
					<SnackbarAlert
						open={snackbarState.open}
						message={snackbarState.message}
						severity={snackbarState.severity}
						setState={setSnackbarState}
					/>
					<Routes>
						<Route path="/login" element={<LoginView />} />
						{Object.values(ALL_ROUTES).map((route, index) => (
							<Route
								key={`route-${index}`}
								path={route.to}
								element={
									<>
										<Navigation
											isMediumOrBelow={isMediumOrBelow}
											navbarHeight={NAVBAR_HEIGHT}
											smallSideNavWidth={SMALL_SIDE_WIDTH}
											largeSideNavWidth={LARGE_SIDE_WIDTH}
											routes={SIDE_NAV_ROUTES}
										/>
										<Box sx={MainContentSx}>
											<ViewPaper
												body={
													<AuthenticatedRoute
														children={route.element}
													/>
												}
											/>
										</Box>
									</>
								}
							/>
						))}
					</Routes>
				</Router>
			</AlertContext.Provider>
			</UserProvider>
		</ThemeProvider>
	);
}

export default App;
