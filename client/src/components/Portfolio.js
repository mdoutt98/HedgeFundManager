import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ApexCharts from 'react-apexcharts';


//Greens: #6dd6a0, #8ddea3


const Portfolio = () => {
    const [currentTab, setCurrentTab] = useState('LeagueOne');

    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const portfolioChartData = {
        series: [{
            name: "Portfolio Value",
            data: [1.5, 1.23, 1.25, 1.68, 1.73, 1.40, 1.63, 1.80, 1.90, 2.00]
        }],
        options: {
            chart: {
                type: 'area',
                toolbar: {
                    show: true,
                    tools: {
                        download: false
                    }
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false // Disables the data labels on the line
            },

            xaxis: {
                categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
                title: {
                    text: 'Time'
                }
            },
            yaxis: {
                title: {
                    text: 'Value (M$)',
                    min: 1.0,
                    max: 2.5,
                }
            },
            stroke: {
                curve: 'smooth', // For a smoother line
                width: 2,
                colors: ['#69f0ae'], // The green color approximation for the line
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0,
                    stops: [0, 100],
                    type: 'vertical',
                    colorStops: [
                        {
                            offset: 0,
                            color: "#69f0ae",
                            opacity: .3
                        },
                        {
                            offset: 90,
                            color: "#69f0ae",
                            opacity: 0
                        }
                    ]
                }
            },
            tooltip: {
                enabled: true
            }
        }
    };
    // Assuming the current value and the change are known (You might need to calculate these)
    const currentValue = 2000000; // $2,000,000
    const valueChange = 500000; // $500,000
    const percentageChange = 50.00; // 50%

    // Determine color based on gain or loss
    const valueChangeColor = valueChange >= 0 ? '#66bb6a' : '#ff1744';

    return (
        <Box>
            <Tabs value={currentTab} onChange={handleChange} aria-label="League tabs">
                <Tab label="LeagueOne" value="LeagueOne" />
                <Tab label="LeagueTwo" value="LeagueTwo" />
                <Tab label="LeagueThree" value="LeagueThree" />
            </Tabs>

            {currentTab === 'LeagueOne' && (
                <Box>
                    <Box textAlign="center" style={{ marginBottom: '-20px', marginTop: '10px' }}>
                    <Typography variant="h5" style={{ color: 'white', fontWeight: 'bold' }}>
                        ${currentValue.toLocaleString()} <span style={{ fontSize: '0.8rem', color: 'gray' }}>USD</span>
                    </Typography>
                        <Typography variant="h6" style={{ color: valueChangeColor, fontSize: '1rem' }}>
                            {valueChange >= 0 ? '+' : ''}{valueChange.toLocaleString()} ({percentageChange.toFixed(2)}%)
                        </Typography>
                    </Box>
                    <ApexCharts
                        type="area"
                        series={portfolioChartData.series}
                        options={portfolioChartData.options}
                        height={350}
                    />
                    <LeagueOneTable />
                </Box>
            )}
            {currentTab === 'LeagueTwo' && <Box>No active league</Box>}
            {currentTab === 'LeagueThree' && <Box>No active league</Box>}
        </Box>
    );
};

const LeagueOneTable = () => {
    const stockData = [
        // Mock data for the table
        { symbol: 'AAPL', qty: 10, price: 150, totalValue: 1500, sparklineData: [140, 142, 145, 148, 150, 149, 150] },
        { symbol: 'MSFT', qty: 15, price: 200, totalValue: 3000, sparklineData: [125, 198, 200, 140, 160, 205, 230] },
        { symbol: 'AMZN', qty: 5, price: 3000, totalValue: 15000, sparklineData: [2950, 2970, 2990, 3000, 3020, 3050, 3000] },
        { symbol: 'GOOG', qty: 8, price: 2500, totalValue: 20000, sparklineData: [2450, 2475, 2500, 2525, 2500, 2490, 2500] },
        { symbol: 'FB', qty: 20, price: 270, totalValue: 5400, sparklineData: [260, 262, 265, 270, 275, 270, 268] },
        { symbol: 'TSLA', qty: 10, price: 600, totalValue: 6000, sparklineData: [200, 350, 400, 510, 405, 250, 600] },
        { symbol: 'NFLX', qty: 12, price: 350, totalValue: 4200, sparklineData: [340, 345, 350, 355, 360, 350, 348] },
        { symbol: 'NVDA', qty: 15, price: 500, totalValue: 7500, sparklineData: [480, 490, 495, 500, 505, 510, 500] },
        { symbol: 'INTC', qty: 18, price: 55, totalValue: 990, sparklineData: [50, 20, 60, 55, 90, 80, 110] },
        { symbol: 'AMD', qty: 22, price: 85, totalValue: 1870, sparklineData: [80, 82, 83, 85, 86, 84, 85] }
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="stock table">
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Trend</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stockData.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.symbol}</TableCell>
                            <TableCell>{row.qty}</TableCell>
                            <TableCell>
                                <ApexCharts
                                    options={{
                                        chart: {
                                            type: 'line',
                                            sparkline: {
                                                enabled: true
                                            }
                                        },
                                        stroke: {
                                            curve: 'straight'
                                        },
                                        colors: [row.sparklineData[row.sparklineData.length - 1] > row.sparklineData[row.sparklineData.length - 2] ? '#66bb6a' : '#ff1744'],
                                    }}
                                    series={[{ data: row.sparklineData }]}
                                    type="line"
                                    width="100"
                                    height="20"
                                />
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color={row.sparklineData[row.sparklineData.length - 1] > row.sparklineData[row.sparklineData.length - 2] ? "success" : "error"}>
                                    ${row.price}
                                </Button>
                            </TableCell>
                            <TableCell>${row.totalValue}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Portfolio;