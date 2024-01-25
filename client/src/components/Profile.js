import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, Button, List, ListItem, ListItemText, IconButton, Tooltip, TextField, FormControl, InputLabel, Select, MenuItem, Stack, Tabs, Tab } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ProfilePage = () => {
    const [firstName, setFirstName] = useState('John'); // Replace with actual data
    const [lastName, setLastName] = useState('Doe'); // Replace with actual data
    const [avatar, setAvatar] = useState(''); // URL of the avatar image
    const [availableLeagues, setAvailableLeagues] = useState([]);
    const [userLeagues, setUserLeagues] = useState([]);
    const [currentTab, setCurrentTab] = useState('joinLeague');
    const [showCreateLeagueForm, setShowCreateLeagueForm] = useState(false);

    useEffect(() => {
        // Replace with actual API calls
        setAvailableLeagues([
            { id: 1, name: 'League 1' },
            { id: 2, name: 'League 2' }
        ]);
        setUserLeagues([
            { id: 3, name: 'My League 1' }
        ]);
    }, []);


    const handleJoinLeague = (leagueId) => {
        console.log('Join league:', leagueId);
        // Placeholder for join league logic
    };

    const handleLeaveLeague = (leagueId) => {
        console.log('Leave league:', leagueId);
        // Placeholder for leave league logic
    };

    const handleAvatarChange = (event) => {
        // Handle file upload or initials change for avatar
        // Placeholder logic
        console.log('Avatar changed:', event.target.files[0]);
    };


    const getInitials = (firstName, lastName) => {
        return firstName.charAt(0) + lastName.charAt(0);
    };


    const [newLeague, setNewLeague] = useState({
        name: '',
        initialCapital: '',
        startDate: '',
        endDate: '',
        maxParticipants: '',
        assetLimitations: 'None',
        mode: 'Real',
        errors: {
            initialCapital: false,
            maxParticipants: false,
            startDate: false,
            endDate: false
        }
    });

    const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD

    const handleCreateLeagueSubmit = () => {
        const { initialCapital, maxParticipants, startDate, endDate } = newLeague;
        let errors = {};
        let isValid = true;

        if (!initialCapital || initialCapital <= 0 || !Number.isInteger(Number(initialCapital))) {
            errors.initialCapital = true;
            isValid = false;
        }

        if (!maxParticipants || maxParticipants <= 0 || !Number.isInteger(Number(maxParticipants))) {
            errors.maxParticipants = true;
            isValid = false;
        }

        if (!startDate || new Date(startDate) < new Date(today)) {
            errors.startDate = true;
            isValid = false;
        }

        if (!endDate || new Date(endDate) <= new Date(startDate)) {
            errors.endDate = true;
            isValid = false;
        }

        if (isValid) {
            console.log('Creating league:', newLeague);
            // Placeholder for create league logic
        } else {
            setNewLeague(prevState => ({ ...prevState, errors }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLeague(prevState => ({
            ...prevState,
            [name]: value,
            errors: { ...prevState.errors, [name]: false }
        }));
    };

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
        setShowCreateLeagueForm(newValue === 'createLeague'); // Show form only if 'createLeague' tab is selected
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" minHeight="100vh">
            <Box width="100%" maxWidth={500} p={3} textAlign="center">
                <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56, mb: 2 }}>
                        {avatar ? <img src={avatar} alt="Avatar" /> : getInitials(firstName, lastName)}
                    </Avatar>
                    <Tooltip title="Change Avatar">
                        <IconButton color="primary" component="label" sx={{ mt: -7, ml: 7 }}>
                            <input type="file" hidden onChange={handleAvatarChange} />
                            <PhotoCamera />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Typography variant="h6" mb={2}>My Leagues</Typography>
                <List>
                    {availableLeagues.map((league) => (
                        <ListItem key={league.id}>
                            <ListItemText primary={league.name} />
                            <Button variant="outlined" onClick={() => handleJoinLeague(league.id)}>
                                Join
                            </Button>
                        </ListItem>
                    ))}
                </List>

                <Tabs value={currentTab} onChange={handleTabChange} centered>
                    <Tab label="Join a League" value="joinLeague" />
                    <Tab label="Create a League" value="createLeague" />
                </Tabs>

                {currentTab === 'joinLeague' && (
                    <List>
                        {userLeagues.map((league) => (
                            <ListItem key={league.id} secondaryAction={
                                <Button variant="outlined" color="error" onClick={() => handleLeaveLeague(league.id)}>
                                    Leave
                                </Button>
                            }>
                                <ListItemText primary={league.name} />
                            </ListItem>
                        ))}
                    </List>
                )}

                {showCreateLeagueForm && (
                    <Box mt={2}>
                        <Typography variant="h6">Create a League</Typography>
                        <Stack spacing={2} mt={2}>
                            <TextField
                                label="League Name"
                                fullWidth
                                name="name"
                                value={newLeague.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Initial Capital"
                                fullWidth
                                name="initialCapital"
                                value={newLeague.initialCapital}
                                onChange={handleChange}
                                error={newLeague.errors.initialCapital}
                                helperText={newLeague.errors.initialCapital ? "Invalid Initial Capital" : ""}
                                type="number"
                            />
                            <TextField
                                label="Max Participants"
                                fullWidth
                                name="maxParticipants"
                                value={newLeague.maxParticipants}
                                onChange={handleChange}
                                error={newLeague.errors.maxParticipants}
                                helperText={newLeague.errors.maxParticipants ? "Invalid Max Participants" : ""}
                                type="number"
                            />
                            <TextField
                                label="Start Date"
                                type="date"
                                fullWidth
                                name="startDate"
                                value={newLeague.startDate}
                                onChange={handleChange}
                                error={newLeague.errors.startDate}
                                helperText={newLeague.errors.startDate ? "Invalid Start Date" : ""}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: today }}
                            />
                            <TextField
                                label="End Date"
                                type="date"
                                fullWidth
                                name="endDate"
                                value={newLeague.endDate}
                                onChange={handleChange}
                                error={newLeague.errors.endDate}
                                helperText={newLeague.errors.endDate ? "Invalid End Date" : ""}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: newLeague.startDate || today }}
                            />
                            <FormControl fullWidth>
                                <InputLabel>Asset Limitations</InputLabel>
                                <Select
                                    name="assetLimitations"
                                    value={newLeague.assetLimitations}
                                    label="Asset Limitations"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="None">None</MenuItem>
                                    <MenuItem value="Stocks Only">Stocks Only</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Mode</InputLabel>
                                <Select
                                    name="mode"
                                    value={newLeague.mode}
                                    label="Mode"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Real">Real</MenuItem>
                                    <MenuItem value="Simulated-MC">Simulated-MC</MenuItem>
                                    <MenuItem value="Simulated-Hybrid">Simulated-Hybrid</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" onClick={handleCreateLeagueSubmit} sx={{ mt: 2 }}>Submit</Button>
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;
