// darkTheme.js
import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#26a69a', // This is a teal green shade similar to the "positive" values in the image
        },
        secondary: {
            main: '#ef5350', // This is a red-orange shade for "negative" values in the image
        },
        error: {
            main: '#ff1744', // Red accent for errors or warnings
        },
        background: {
            default: '#0d1117', // A very dark blue similar to the background in the image
            paper: '#161b22', // Slightly lighter shade of dark blue for card elements
        },
        text: {
            primary: '#c9d1d9', // Light gray for better readability, common in dark themes
            secondary: '#8b949e', // A secondary text color that is slightly dimmed
        },
        // Depending on your needs, you can define additional colors here
    },
    // You can also extend the theme with additional customizations as needed
});

export default darkTheme;
