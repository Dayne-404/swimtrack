import { Button, Grid, Divider } from '@mui/material';
import SearchBar from '../../components/inputs/SearchBar';
import SortSelect from '../../components/inputs/SortSelect';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

const GroupHeader = () => {
	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={6}>
					<SearchBar size="small" />
				</Grid>
				<Grid item xs={6}>
					<SortSelect menuItems={['Recent', 'Oldest']} />
				</Grid>
				<Grid item xs={12} md={3}>
					<Button
						variant="outlined"
						fullWidth
						startIcon={<CreateNewFolderIcon />}
					>
						New Group
					</Button>
				</Grid>
			</Grid>
			<Divider sx={{ my: 1.5 }} />
		</>
	);
};

export default GroupHeader;
