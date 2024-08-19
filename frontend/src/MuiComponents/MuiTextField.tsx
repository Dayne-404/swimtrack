import { InputAdornment, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const MuiTextField = () => {
	const [password, setPassword] = useState<string>('')

    return (
		<Stack direction="column" spacing={2}>
			<Stack direction="row" spacing={2}>
				<TextField label="Name"></TextField>
				<TextField label="Name" variant="filled"></TextField>
				<TextField label="Name" variant="standard"></TextField>
			</Stack>
			<Stack direction="row" spacing={2}>
				<TextField
					label="Password"
					color="success"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
					helperText={(password.length < 5) ? 'Required' : ' '}
                    type='password'
                    error={(password.length < 5)}
                    required
				></TextField>
                <TextField
					label="Read Only"
					color="success"
                    inputProps={{readOnly: true}}
                    type='password'
				></TextField>
			</Stack>
            <Stack direction='row' spacing={2}>
                <TextField 
                    label="Hello world"
                    InputProps={
                        {
                            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                            endAdornment: <InputAdornment position='end'>$</InputAdornment>
                        }
                    }
                >
                </TextField>
            </Stack>
		</Stack>
	);
};

export default MuiTextField;
