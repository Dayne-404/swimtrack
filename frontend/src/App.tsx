import { createTheme, colors, ThemeProvider, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import SideNav from "./components/SideNav";
import './styles/fonts.css';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.lightBlue[700],
    }
  },
  typography: {
    fontFamily: 'Lexend, Arial, sans-serif',
  },
});

function App() {
	return (
		<ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <SideNav />
        <Box component='main'
          sx={{
            p: '8rem 4rem',
            width: '100%',
            height: '100vh',
            backgroundColor: 'secondary.main',
            boxSizing: 'border-box',
            // Account for the width of the SideNav
          }}
        />
      </Box>
		</ThemeProvider>
	);
}

export default App;
