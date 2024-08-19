import {
	Stack,
	Button,
	IconButton,
	ButtonGroup,
	ToggleButtonGroup,
	ToggleButton,
} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormateBoldIcon from '@mui/icons-material/FormatBold';
import FormateItalicIcon from '@mui/icons-material/FormatItalic';
import FormateUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { useState } from 'react';

const MuiButton = () => {
	const [formats, setFormats] = useState<string[]>([]);

	const handleFormatChange = (
		_event: React.MouseEvent<HTMLElement>,
		updatedFormats: string[]
	) => {
		setFormats(updatedFormats);
	};

	return (
		<Stack spacing={4}>
			<Stack spacing={2} direction="row">
				<Button variant="text" href="https://google.com">
					Text Button
				</Button>
				<Button variant="contained">Contained Button</Button>
				<Button variant="outlined">Outlined Button</Button>
			</Stack>
			<Stack spacing={2} direction="row">
				<Button variant="text" color="primary">
					Primary
				</Button>
				<Button variant="outlined" color="secondary">
					Secondary
				</Button>
				<Button variant="text" color="error">
					Error
				</Button>
				<Button variant="outlined" color="warning">
					Warning
				</Button>
				<Button variant="text" color="info">
					Info
				</Button>
				<Button variant="outlined" color="success">
					Success
				</Button>
			</Stack>
			<Stack display="block" spacing={2} direction="row">
				<Button
					variant="contained"
					size="small"
					disableRipple
					onClick={() => alert('Clicked')}
				>
					Small
				</Button>
				<Button variant="contained" size="medium" disableElevation>
					Medium
				</Button>
				<Button variant="contained" size="large">
					Large
				</Button>
			</Stack>
			<Stack display="block" spacing={2} direction="row">
				<Button
					variant="contained"
					size="large"
					color="error"
					startIcon={<HomeOutlinedIcon />}
				>
					Home
				</Button>
				<Button
					variant="contained"
					size="large"
					color="error"
					endIcon={<HomeOutlinedIcon />}
				>
					Home
				</Button>
				<IconButton size="large" color="success">
					<HomeOutlinedIcon />
				</IconButton>
			</Stack>
			<Stack direction="row" spacing={2}>
				<ButtonGroup
					variant="contained"
					orientation="vertical"
					size="medium"
					color="secondary"
				>
					<Button>Left</Button>
					<Button>Center</Button>
					<Button>Right</Button>
				</ButtonGroup>
			</Stack>
			<Stack direction="row" spacing={2}>
				<ToggleButtonGroup
					value={formats}
					onChange={handleFormatChange}
				>
					<ToggleButton value="bold">
						<FormateBoldIcon />
					</ToggleButton>
					<ToggleButton value="italic">
						<FormateItalicIcon />
					</ToggleButton>
					<ToggleButton value="underlined">
						<FormateUnderlinedIcon />
					</ToggleButton>
				</ToggleButtonGroup>
			</Stack>
		</Stack>
	);
};

export default MuiButton;
