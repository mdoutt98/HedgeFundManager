import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Tabs, Tab, TextField, Button, Typography, Paper } from '@mui/material';

const LoginRegisterDemo = () => {
    const [tab, setTab] = useState('signIn');
    const [loginField, setLoginField] = useState(''); // For username or email
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    // Replace with your API URL from environment variables
    const API_URL = 'http://127.0.0.1:8000';

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
        setError('');
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            // Prepare the data to be sent to the backend
            const loginData = {
                username: loginField, // Send the loginField as 'username'
                password: password
            };

            // Make the POST request to the login API
            const response = await axios.post(`${API_URL}/api/login/`, loginData);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/league');
            }
        } catch (err) {
            setError('Invalid username/email or password');
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/register/`, {
                username, email, first_name: firstName, last_name: lastName, password
            });
            if (response.data) {
                console.log('Registration successful:', response.data);
                setTab('signIn');
            }
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', width: '100%' }}>
                <Tabs value={tab} onChange={handleTabChange} centered>
                    <Tab label="Sign In" value="signIn" />
                    <Tab label="Register" value="register" />
                </Tabs>

                {tab === 'signIn' && (
                    <Box p={3}>
                        <Typography variant="h4" mb={2}>Sign In</Typography>
                        {error && <Typography color="error" mb={2}>{error}</Typography>}
                        <form onSubmit={handleSignIn} noValidate>
                            <TextField fullWidth label="Username/Email" margin="normal" value={loginField} onChange={(e) => setLoginField(e.target.value)} />
                            <TextField fullWidth type="password" label="Password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>Sign In</Button>
                        </form>
                    </Box>
                )}

                {tab === 'register' && (
                    <Box p={3}>
                        <Typography variant="h4" mb={2}>Register</Typography>
                        {error && <Typography color="error" mb={2}>{error}</Typography>}
                        <form onSubmit={handleRegister} noValidate>
                            <TextField fullWidth label="Email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <TextField fullWidth label="First Name" margin="normal" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <TextField fullWidth label="Last Name" margin="normal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <TextField fullWidth type="password" label="Password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>Register</Button>
                        </form>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default LoginRegisterDemo;
