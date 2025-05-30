import {
	TextField,
	Box,
	InputAdornment,
	IconButton,
	useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type SearchBarProps = {
	disabled?: boolean;
	size: 'medium' | 'small';
	width?: string;
	placeholderText?: string;
};

const SearchBar = ({
	disabled = false,
	size,
	width,
	placeholderText = 'Search',
}: SearchBarProps) => {
	const theme = useTheme();

	return (
		<Box width={width}>
			<TextField
				disabled={disabled}
				id="search-var"
				placeholder={placeholderText}
				size={size}
				variant="outlined"
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton edge="end">
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					),
				}}
				sx={{
					'& .MuiInputBase-input::placeholder': {
						color: theme.palette.text.secondary,
						opacity: 1, 
					},
				}}
			></TextField>
		</Box>
	);
};

export default SearchBar;
