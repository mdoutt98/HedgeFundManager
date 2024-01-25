import React, { useState } from 'react';
import { Box, TextField, Autocomplete, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ApexCharts from 'react-apexcharts';



const Marketplace = () => {
    const [selectedStock, setSelectedStock] = useState(null);
    const [amount, setAmount] = useState(1);

    const mockStocks = [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        // ... more stocks
    ];

    const handleStockSelect = (event, value) => {
        setSelectedStock(value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const candlestickChartData = {
        series: [{
            data: [
                // Mock candlestick data
                { x: new Date('2023-04-01'), y: [100, 110, 95, 98] },
                { x: new Date('2023-04-02'), y: [102, 115, 101, 105] },
                { x: new Date('2023-04-03'), y: [113, 117, 105, 107] },
                { x: new Date('2023-04-04'), y: [110, 120, 108, 111] },
                { x: new Date('2023-04-05'), y: [115, 125, 112, 118] },
                { x: new Date('2023-04-08'), y: [120, 130, 119, 123] },
                { x: new Date('2023-04-09'), y: [122, 132, 118, 121] },
                { x: new Date('2023-04-10'), y: [130, 134, 125, 129] },
                { x: new Date('2023-04-11'), y: [128, 138, 126, 133] },
                { x: new Date('2023-04-12'), y: [132, 136, 130, 131] },
                { x: new Date('2023-04-15'), y: [131, 141, 129, 138] },
                { x: new Date('2023-04-16'), y: [139, 144, 136, 140] },
                { x: new Date('2023-04-17'), y: [140, 145, 138, 143] },
                { x: new Date('2023-04-18'), y: [141, 146, 140, 142] },
                { x: new Date('2023-04-19'), y: [142, 147, 137, 139] },
                { x: new Date('2023-04-22'), y: [138, 142, 135, 141] },
                { x: new Date('2023-04-23'), y: [141, 148, 137, 145] },
                { x: new Date('2023-04-24'), y: [142, 147, 139, 144] },
                { x: new Date('2023-04-25'), y: [145, 149, 141, 146] },
                { x: new Date('2023-04-26'), y: [146, 151, 144, 148] },
                { x: new Date('2023-04-29'), y: [148, 155, 146, 153] },
                { x: new Date('2023-04-30'), y: [150, 157, 148, 152] },
                { x: new Date('2023-05-01'), y: [152, 158, 150, 155] },
                { x: new Date('2023-05-02'), y: [154, 160, 152, 157] },
                { x: new Date('2023-05-03'), y: [156, 162, 154, 159] },
                { x: new Date('2023-05-06'), y: [158, 164, 156, 161] },
                { x: new Date('2023-05-07'), y: [160, 165, 158, 163] },
                { x: new Date('2023-05-08'), y: [162, 166, 160, 164] },
                { x: new Date('2023-05-09'), y: [164, 169, 162, 166] },
                { x: new Date('2023-05-10'), y: [166, 170, 164, 168] },
                { x: new Date('2023-05-13'), y: [168, 172, 166, 170] },
                { x: new Date('2023-05-14'), y: [170, 174, 168, 172] },
                { x: new Date('2023-05-15'), y: [172, 176, 170, 174] },
                { x: new Date('2023-05-16'), y: [174, 178, 172, 176] },
                { x: new Date('2023-05-17'), y: [176, 180, 174, 178] },
                { x: new Date('2023-05-20'), y: [178, 183, 176, 181] },
                { x: new Date('2023-05-21'), y: [180, 185, 178, 183] },
                { x: new Date('2023-05-22'), y: [182, 187, 180, 185] },
                { x: new Date('2023-05-23'), y: [184, 189, 182, 187] },
                { x: new Date('2023-05-24'), y: [186, 191, 184, 189] },
                { x: new Date('2023-05-27'), y: [188, 193, 186, 191] },
                { x: new Date('2023-05-28'), y: [190, 195, 188, 193] },
                { x: new Date('2023-05-29'), y: [192, 197, 190, 195] },
                { x: new Date('2023-05-30'), y: [194, 199, 192, 197] },
                { x: new Date('2023-05-31'), y: [196, 201, 194, 199] },
                { x: new Date('2023-06-03'), y: [198, 203, 196, 201] },
                { x: new Date('2023-06-04'), y: [200, 205, 198, 203] },
                { x: new Date('2023-06-05'), y: [202, 207, 200, 205] },
                { x: new Date('2023-06-06'), y: [204, 209, 202, 207] },
                { x: new Date('2023-06-07'), y: [206, 211, 204, 209] },
                { x: new Date('2023-06-10'), y: [208, 213, 206, 211] },
                { x: new Date('2023-06-11'), y: [210, 215, 208, 213] },
                { x: new Date('2023-06-12'), y: [212, 217, 210, 215] },
                { x: new Date('2023-06-13'), y: [214, 219, 212, 217] },
                { x: new Date('2023-06-14'), y: [216, 221, 214, 219] },
                { x: new Date('2023-06-17'), y: [218, 223, 216, 221] },
                { x: new Date('2023-06-18'), y: [220, 225, 218, 223] },
                { x: new Date('2023-06-19'), y: [222, 227, 220, 225] }
            ]
        }],
        options: {
            chart: {
                type: 'candlestick',
                height: 350
            },
            title: {
                text: 'CandleStick Chart',
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        },
    };

    const mockTableData = [
        // Data corresponding to the selected stock
        { symbol: 'AAPL', open: 150, high: 155, low: 149, close: 154, adjClose: 153, currentPrice: 154 },
        // ... more data as needed
    ];

    return (
        <Box>
            <Autocomplete
                options={mockStocks}
                getOptionLabel={(option) => option.symbol}
                style={{ width: 300 }}
                onChange={handleStockSelect}
                renderInput={(params) => <TextField {...params} label="Search Stocks" variant="outlined" />}
            />
            <ApexCharts
                options={candlestickChartData.options}
                series={candlestickChartData.series}
                type="candlestick"
                height={350}
            />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="stock table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Symbol</TableCell>
                            <TableCell>Open</TableCell>
                            <TableCell>High</TableCell>
                            <TableCell>Low</TableCell>
                            <TableCell>Close</TableCell>
                            <TableCell>Adjusted Close</TableCell>
                            <TableCell>Current Price</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Buy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockTableData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.symbol}</TableCell>
                                <TableCell>{row.open}</TableCell>
                                <TableCell>{row.high}</TableCell>
                                <TableCell>{row.low}</TableCell>
                                <TableCell>{row.close}</TableCell>
                                <TableCell>{row.adjClose}</TableCell>
                                <TableCell>{row.currentPrice}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        inputProps={{ min: 1, max: 10000 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary">Buy</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
    
export default Marketplace;
