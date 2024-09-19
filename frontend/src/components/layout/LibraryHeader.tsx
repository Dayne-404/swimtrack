import { Button, Grid, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useNavigate } from 'react-router-dom';

const LibraryHeader = () => {
	const navigate = useNavigate();
    
    return (
		<Box width="100%">
            <Typography variant="h6">Actions</Typography>
			<Grid container spacing={1} >
				<Grid item xs={12} sm={4} md={2}>
					<Button
						startIcon={<CreateIcon />}
						fullWidth
						variant="contained"
                        onClick={() => navigate('/create')}
					>
						New Worksheet
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={2}>
					<Button
						startIcon={<CreateNewFolderIcon />}
						fullWidth
						variant="contained"
                        onClick={() => navigate('/groups')}
					>
						Groups
					</Button>
				</Grid>
				<Grid item xs={12} sm={4} md={2}>
					<Button
						startIcon={<SearchIcon />}
						fullWidth
						variant="contained"
                        onClick={() => navigate('/finder')}
					>
						Find More
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default LibraryHeader;
