import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!username || !firstName || !lastName || !password) {
            setError('All fields are required.');
            return;
        }

        axios.post('http://127.0.0.1:8000/api/register/', { username, firstName, lastName, password })
            .then(response => {
                // Handle success
                console.log('User registered:', response.data);
            })
            .catch(error => {
                // Handle error
                setError('Registration failed. Please try again.');
            });
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Box width="100%" maxWidth={500} p={3} textAlign="center">
                <Typography variant="h4" mb={2}>Register</Typography>
                {error && <Typography color="error" mb={2}>{error}</Typography>}
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        fullWidth
                        label="Username/Email"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        margin="normal"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        margin="normal"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                        Register
                    </Button>
                </form>
            </Box>
        </Box>
    );
};

export default Register;
