import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './components/ResponsiveAppBar'; // Make sure to import this
import darkTheme from './theme/darkTheme';
import League from './components/League';
import Portfolio from './components/Portfolio'; // Placeholder import
import Marketplace from './components/Marketplace'; // Placeholder import
import Rules from './components/Rules'; // Placeholder import
import Box from '@mui/material/Box';
import ItemList from './components/ItemList';
import Register from "./components/Register";
import Profile from "./components/Profile";
import Account from "./components/Account";
import Login from "./components/Login";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <Router>
                <ResponsiveAppBar />
                <Box
                    sx={{
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        p: 2,
                        borderRadius: 1,
                        minHeight: '100vh', // Ensure the Box takes up at least the full viewport height
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/rules" element={<Rules />} />
                        <Route path="/league" element={<League />} />
                        <Route path="/items" element={<ItemList />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
