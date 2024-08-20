import { TextField, Box, InputAdornment, IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'

type SearchBarProps = {
    size: 'medium' | 'small'
    width: number
} 

const SearchBar = ({size, width} : SearchBarProps) => {
  return (
    <Box width={width + 'px'}>
        <TextField
            id="search-var"
            placeholder="Search"
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
        >
        </TextField>
    </Box>
  )
}

export default SearchBar