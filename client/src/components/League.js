import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tabs, Tab, Box  } from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import darkTheme from '../theme/darkTheme';

const League = () => {
    const [currentTab, setCurrentTab] = useState('LeagueOne');
    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    // Function to format currency
    const formatCurrency = (value) => {
        return `$${value.toLocaleString()} USD`;
    };

    // Function to calculate and format gain/loss
    const formatChange = (value) => {
        const initialValue = 1500000; // Correct initial amount as per your instruction
        const changeValue = value - initialValue;
        const percentageChange = (changeValue / initialValue) * 100;
        const isPositive = changeValue >= 0; // Include 0 as positive for no change

        // Make sure to handle cases where changeValue or percentageChange is NaN
        const formattedChange = isNaN(changeValue) ? 'N/A' : `${Math.abs(changeValue / 1000).toFixed(2)}k`;
        const formattedPercentage = isNaN(percentageChange) ? 'N/A' : `${percentageChange.toFixed(2)}%`;
        const color = isPositive ? '#66bb6a' : '#ff1744';
        const ArrowIcon = isPositive ? <ArrowUpward style={{ color: color, fontSize: '16px' }} /> : <ArrowDownward style={{ color: color, fontSize: '16px' }} />;

        return (
            <span style={{ color: color, display: 'flex', alignItems: 'center' }}>
            {isPositive && changeValue !== 0 ? '+' : ''}${formattedChange} ({formattedPercentage})
                {changeValue !== 0 ? ArrowIcon : null}
        </span>
        );
    };
        // Static mock data for the rankings table
    const rankings = [
        { rank: 1, user: 'User1', value: 1900000, change: 'up' },
        { rank: 2, user: 'User2', value: 1650000, change: 'down' },
        { rank: 3, user: 'User3', value: 1500000, change: 'up' },
        { rank: 4, user: 'User4', value: 1350000, change: 'down' },
        { rank: 5, user: 'User5', value: 1200000, change: 'up' },
    ];

    // Function to generate date labels
    const generateDateLabels = (days) => {
        const currentDate = new Date();
        const dateLabels = [];
        for (let i = 0; i <= days; i++) {
            const date = new Date(currentDate);
            date.setDate(currentDate.getDate() + i);
            dateLabels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        return dateLabels;
    };

    // Function to create portfolio data for a user
    const createPortfolioData = (initialValue, currentValue) => {
        const days = 21; // 3 weeks
        // Calculate the daily step value. If there's no change, then the step is 0.
        const step = (currentValue - initialValue) / days;
        let value = initialValue;
        const data = Array.from({ length: days }, () => {
            value += step;
            return Math.round(value);
        });
        // Ensure the last value in the array is exactly the current portfolio value
        data.push(currentValue);
        return data;
    };


    // Line chart configuration
    const lineChartOptions = {
        chart: {
            type: 'area',
            toolbar: {
                show: false, // Ensures that the toolbar, including the zoom options, will not be displayed
            },
            zoom: {
                enabled: false, // Disables zooming functionality
            }
        },
        xaxis: {
            type: 'category', // Specifies that the x-axis should be treated as categorical
            categories: generateDateLabels(21), // Generates the date labels for the x-axis
        },
        yaxis: {
            title: {
                text: 'Portfolio Value (USD)', // Sets the y-axis title
            },
            labels: {
                formatter: (value) => `$${(value / 1000000).toFixed(2)}M`, // Formats the y-axis labels to display in millions
            },
        },
        colors: ['#00e396', '#008ffb', '#FE019A', '#FF9933', '#FAED27','#80DAEB', '#775dd0', '#ff4560'], // Sets the colors for the series
    };

    const lineChartData = {
        series: rankings.map((row) => ({
            name: row.user,
            data: createPortfolioData(1500000, row.value), // Generates the data series for each user
        })),
    };


    return (
            <ThemeProvider theme={darkTheme}>
                {/* Tabs */}
                <Box>
                    <Tabs value={currentTab} onChange={handleChange} aria-label="League tabs">
                        <Tab label="LeagueOne" value="LeagueOne" />
                        <Tab label="LeagueTwo" value="LeagueTwo" />
                        <Tab label="LeagueThree" value="LeagueThree" />
                    </Tabs>

                    {currentTab === 'LeagueOne' && (
                        <Box>
                            {/* Rankings Table */}
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Rank</TableCell>
                                            <TableCell>User</TableCell>
                                            <TableCell>Portfolio Value</TableCell>
                                            <TableCell>Gain/Loss</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rankings.map((row) => (
                                            <TableRow key={row.user}>
                                                <TableCell>{row.rank}</TableCell>
                                                <TableCell>{row.user}</TableCell>
                                                <TableCell>{formatCurrency(row.value)}</TableCell>
                                                <TableCell>{formatChange(row.value)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                </Table>
                            </TableContainer>
                            {/* Line Chart */}
                            <div className="line-chart">
                                <ReactApexChart
                                    options={lineChartOptions}
                                    series={lineChartData.series}
                                    type="line"
                                    height={350}
                                />
                            </div>
                        </Box>
                    )}
                    {currentTab === 'LeagueTwo' && <Box>No active league</Box>}
                    {currentTab === 'LeagueThree' && <Box>No active league</Box>}
                </Box>
            </ThemeProvider>
        );
    };
export default League;