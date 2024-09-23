import React, { useEffect, useState } from 'react';
import {
	Avatar,
	Box,
	Typography,
	Grid,
	Button,
	TextField,
	Stack,
	Divider,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import { useUser } from '../components/hooks/useUser';
import { InstructorPrivate } from '../config/instructorType';
import { fetchInstructor } from '../helper/instructorGetRequests';

const ProfileSettings: React.FC = () => {
    const {user} = useUser();
    const [instructor, setInstructor] = useState<InstructorPrivate>();

    useEffect(() => {
        const getInstructor = async () => {
            try {
                const result: InstructorPrivate = await fetchInstructor(user.id);
                console.log('RESULT', result);
                setInstructor(result);
            } catch (error) {
                console.error('error');
            }
        }

        getInstructor();
    }, [user.id])
    
    return (
		<Box sx={{ margin: 'auto' }}>
			<Box display="flex" alignItems="center" mb={4}>
				<Avatar
					sx={{ width: 120, height: 120, marginRight: 2 }}
					alt="User Avatar"
					src="https://via.placeholder.com/80"
				/>
				<Box>
					<Typography variant="h5">{instructor?.name}</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						{user.type}
					</Typography>
				</Box>
			</Box>

			<Divider sx={{ mb: 4 }} />

			<form>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							label="Email"
							type="email"
							value={instructor?.email || ''}
							variant="outlined"
							disabled
						/>
					</Grid>
					
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label="First Name"
							value={instructor?.name.split(' ')[0] || ''}
							variant="outlined"
                            disabled
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label="Last Name"
							value={instructor?.name.split(' ')[1] || ''}
							variant="outlined"
                            disabled
						/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label="Current Password"
							type="password"
							variant="outlined"
							InputProps={{
								startAdornment: <LockIcon />,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							label="New Password"
							type="password"
							variant="outlined"
							InputProps={{
								startAdornment: <LockIcon />,
							}}
						/>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4 }} />

				<Stack direction="row" spacing={2} justifyContent="flex-end">
					<Button variant="outlined">Cancel</Button>
					<Button
						variant="contained"
						color="primary"
						startIcon={<SaveIcon />}
					>
						Save Changes
					</Button>
				</Stack>
			</form>
		</Box>
	);
};

export default ProfileSettings;
