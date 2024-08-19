import { Typography } from '@mui/material';

export const MuiTest = () => {
	return (
		<div>
			<Typography variant="h1" component='header' gutterBottom>Hello World</Typography>
			<Typography variant="h2">Hello World</Typography>
			<Typography variant="h3">Hello World</Typography>
			<Typography variant="h4">Hello World</Typography>
			<Typography variant="h5">Hello World</Typography>
			<Typography variant="h6">Hello World</Typography>

			<Typography variant="subtitle1">Hello World</Typography>
			<Typography variant="subtitle2">Hello World</Typography>

			<Typography>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
				esse veniam quas alias totam eligendi, maiores dolore incidunt
				voluptatibus. Blanditiis odio accusantium illo fugiat cum non,
				architecto alias natus sequi!
			</Typography>
			<Typography variant="body2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
				deserunt tempore dignissimos doloribus dicta, autem, ratione
				numquam repellendus nostrum quam totam architecto ut voluptates
				earum quos ducimus ullam? Dignissimos, nihil?
			</Typography>
		</div>
	);
};

export default MuiTest;
