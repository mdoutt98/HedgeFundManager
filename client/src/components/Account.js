import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

// Replace with your API URL from environment variables
const API_URL = 'http://127.0.0.1:8000';

const AccountPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUsername(userData.username || '');
            setEmail(userData.email || ''); // Update as per your user data structure
            setFirstName(userData.firstName || '');
            setLastName(userData.lastName || '');
        }
    }, []);


    const handlePasswordReset = async () => {
        try {
            const response = await axios.post('/api/password-reset/', { new_password: newPassword });
            console.log('Password reset successful:', response.data);
            setOpenDialog(false);
        } catch (error) {
            setError('Failed to reset password. Please try again.');
        }
    };


    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Box width="100%" maxWidth={500} p={3} textAlign="center">
                <Typography variant="h4" mb={2}>Account Details</Typography>
                {error && <Typography color="error" mb={2}>{error}</Typography>}
                <form noValidate>
                    <TextField
                        fullWidth
                        label="Username/Email"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="First Name"
                        margin="normal"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        margin="normal"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        value="********" // Masked password
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }} onClick={() => setOpenDialog(true)}>
                        Reset Password
                    </Button>
                </form>

                {/* Password Reset Dialog */}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                        <Button onClick={handlePasswordReset}>Reset</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default AccountPage;
