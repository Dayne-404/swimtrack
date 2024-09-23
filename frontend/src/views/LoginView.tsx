import {
	Box,
	Paper,
	Stack,
	TextField,
	InputAdornment,
	IconButton,
	Button,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import { colors } from '@mui/material';
import Title from '../components/layout/main/Title';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { login } from '../helper/submit';
import LoadingButton from '../components/inputs/buttons/LoadingButton';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [userCredentials, setUserCredentials] = useState<{
		email: string;
		password: string;
	}>({ email: 'admin', password: 'password' });
	const [errors, setErrors] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const backGroundStyle = {
		height: '100vh',
		width: '100%',
		background: `linear-gradient(135deg, ${colors.lightBlue[800]}, ${colors.lightBlue[300]})`,
	};

	const loginContainerStyle = {
		position: 'relative',
		p: 2,
		py: 4,
		boxSizing: 'border-box',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: {
			xs: '90%',
			md: '60%',
			lg: '30%',
			xl: '20%',
		},
		height: {
			xs: '70vh',
			md: '60vh',
		},
        minHeight: {
            xs: '500px',
            md: '600px',
        }
	};

	const stackStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)', // Centers the Stack horizontally and vertically
		width: '80%', // Stack width adjustment for content
		px: 2,
		pt: 3,
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserCredentials({
			...userCredentials,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async () => {
		if (!validateCredentials()) return;

		setLoading(true);
		try {
			const data : {token: string} = await login(userCredentials);
			console.log('Setting token: ', data.token);
			localStorage.setItem('token', data.token);
			navigate('/');
		} catch (error) {
			console.error(error);
			//Add context
		} finally {
			setLoading(false);
		}
	};

	const validateCredentials = () => {
		let valid = true;
		let emailError = '';
		let passwordError = '';

		if (userCredentials.email.trim() === '') {
			emailError = 'Invalid email address';
			valid = false;
		}

		if (userCredentials.password.trim() === '') {
			passwordError = 'Password cannot be empty';
			valid = false;
		}

		setErrors({ email: emailError, password: passwordError });
		return valid;
	};

	return (
		<Box sx={backGroundStyle}>
			<Paper sx={loginContainerStyle}>
				<Title />

				<Stack sx={stackStyle}>
					<TextField
						placeholder="Email"
						name="email"
						disabled={loading}
						value={userCredentials.email}
						error={errors.email.length > 0}
						helperText={errors.email ? errors.email : ' '}
						onChange={handleChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							),
						}}
					/>
					<Box>
						<TextField
							placeholder="Password"
							name="password"
							disabled={loading}
							onChange={handleChange}
							fullWidth
							error={errors.password.length > 0}
							value={userCredentials.password}
							helperText={errors.password ? errors.password : ' '}
							type={!showPassword ? 'password' : undefined}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											onClick={() =>
												setShowPassword(!showPassword)
											}
										>
											{!showPassword ? (
												<VisibilityOffIcon />
											) : (
												<VisibilityIcon />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<FormControlLabel
							control={<Checkbox />}
							disabled={loading}
							label="Remeber me"
						/>
					</Box>
					<Stack spacing={1}>
						<LoadingButton
							text='Sign In'
							fullwidth
							loading={loading}
							disabled={loading}
							varient="contained"
							onClick={handleSubmit}
						/>
						<Stack
							direction="row"
							flexWrap="wrap"
							justifyContent="space-between"
						>
							<Button disabled={loading}>Sign Up</Button>
							<Button disabled={loading}>Forgot Password</Button>
						</Stack>
					</Stack>
				</Stack>
			</Paper>
		</Box>
	);
};

export default LoginView;
