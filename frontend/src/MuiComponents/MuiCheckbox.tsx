import {
	Box,
	FormControlLabel,
	Checkbox,
	FormControl,
	FormLabel,
	FormGroup,
    FormHelperText,
} from '@mui/material';
import { useState } from 'react';
import BookMarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const MuiCheckbox = () => {
	const [acceptTnC, setAcceptTnc] = useState<boolean>(false);
	const [skills, setSkills] = useState<string[]>([]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAcceptTnc(event.target.checked);
	};

	const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = skills.indexOf(event.target.value);

        if(index === -1) {
            setSkills([...skills, event.target.value]);
        } else {
            setSkills(skills.filter((skill) => skill !== event.target.value));
        }
	};

	return (
		<Box>
			<Box>
				<FormControlLabel
					label="I accept the terms and conditions"
					control={
						<Checkbox checked={acceptTnC} onChange={handleChange} />
					}
				/>
			</Box>
			<Box>
				<Checkbox
					icon={<BookMarkBorderIcon />}
					checkedIcon={<BookmarkIcon />}
				/>
			</Box>
			<Box>
				<FormControl>
					<FormLabel>Skills</FormLabel>
					<FormGroup row>
						<FormControlLabel
							label="Javascript"
							value="javascript"
							control={
								<Checkbox
									checked={skills.includes('javascript')}
									onChange={handleSkillChange}
								/>
							}
						/>
						<FormControlLabel
							label="HTML"
							value="html"
							control={
								<Checkbox
									checked={skills.includes('html')}
									onChange={handleSkillChange}
                                    size='small'
                                    color='secondary'
								/>
							}
						/>
						<FormControlLabel
							label="CSS"
							value="css"
							control={
								<Checkbox
									checked={skills.includes('css')}
									onChange={handleSkillChange}
								/>
							}
						/>
					</FormGroup>
                    <FormHelperText>Invalid selection</FormHelperText>
				</FormControl>
			</Box>
		</Box>
	);
};

export default MuiCheckbox;
