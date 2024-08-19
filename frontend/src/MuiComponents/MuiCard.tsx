import {
	Box,
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	CardMedia,
} from '@mui/material';

const MuiCard = () => {
	return (
		<Box width="300px">
			<Card>
				<CardMedia
					component="img"
					height="200"
					image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpWQbprKVYAKSruuMQUf4EXGTwL9--m-7mvQ&s"
					sx={{ padding: '0' }}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						React
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit. Itaque eum doloremque nobis! Iusto, harum
						molestias. Illo impedit eius, consequatur natus eos
						harum commodi sit temporibus rem quod ullam quas quasi.
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">Share</Button>
					<Button size="small">Learn More</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

export default MuiCard;
