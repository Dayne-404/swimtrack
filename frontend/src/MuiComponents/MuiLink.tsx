import { Stack, Link, Typography, Box, Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
const MuiLink = () => {
	return (
		<>
			<Stack spacing={2} direction="row" m={4}>
				<Link href="#">Link</Link>
				<Typography variant="body2">
					<Link href="#" color="secondary" underline="hover">
						Secondary
					</Link>
				</Typography>
			</Stack>
            <Box m={2}>
                <Breadcrumbs separator={<NavigateNextIcon />}>
                    <Link underline='hover' href='#'>Home</Link>
                    <Link underline='hover' href='#'>Catalog</Link>
                    <Link underline='hover' href='#'>Accessories</Link>
                    <Typography>Shoes</Typography>
                </Breadcrumbs>
            </Box>
		</>
	);
};

export default MuiLink;
