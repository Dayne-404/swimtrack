import { Stack, Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

type Skill = {
    id: number,
    label: string,
}

const AutoComplete = () => {
	const skills = ['HTML', 'CSS', 'JavaScript', 'Typescript', 'React'];
	// const [value, setValue] = useState<string | null>(null);
    const [skill, setSkill] = useState<Skill | string | null>(null);

    const skillsOptions = skills.map((skill, index) => ({
        id: index+1,
        label: skill,
    }))

	return (
		<Stack spacing={2} width='250px'>
			<Autocomplete
				options={skillsOptions}
				renderInput={(params) => (
					<TextField {...params} label="skills" />
				)}
                value={skill}
                onChange={(_event, newValue: Skill | string | null) => setSkill(newValue)}
                freeSolo
			/>
		</Stack>
	);
};

export default AutoComplete;
