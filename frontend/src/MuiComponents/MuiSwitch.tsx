import { Box, FormControlLabel, Stack, Switch, Rating } from '@mui/material';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

const MuiSwitch = () => {
	const [checked, setChecked] = useState<boolean>(false);
	const [rating, setRating] = useState<number | null>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const handleRatingChange = (
		_event: React.SyntheticEvent,
		newValue: number | null
	) => {
		setRating(newValue);
	};

	return (
		<Box>
			<Box>
				<FormControlLabel
					label="Dark mode"
					control={
						<Switch
							checked={checked}
							onChange={handleChange}
							color="secondary"
						/>
					}
				/>
			</Box>
			<Stack spacing={2}>
				<Rating
					value={rating}
					onChange={handleRatingChange}
					precision={0.5}
					size="large"
                    icon={<FavoriteIcon fontSize='inherit' color='error' />}
                    emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
                    // highlightSelectedOnly
                    // readOnly
				/>
			</Stack>
		</Box>
	);
};

export default MuiSwitch;
