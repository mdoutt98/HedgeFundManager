import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Rules = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Overview', 'Account Creation', 'Join or Create a League'];

    const StepContent = ({ stepIndex }) => {
        switch (stepIndex) {
            case 0:
                return (
                    <Typography>
                        Welcome to Hedge Fund Tycoon! <br />
                        Get Started with Your Investment Journey: <br />
                        - Create Your Account: Sign up and choose a unique username to dive into the world of virtual investing. <br />
                        - Explore Your Dashboard: Familiarize yourself with the dashboard, your command center for tracking your portfolio’s performance and holdings. <br />
                        - Join the Competition: <br />
                        Enter or Create Leagues: Join existing leagues or create your own with custom features like duration, member limit, initial capital, and password for exclusive access. <br />
                        - Dive into the Markets: Join a league to receive your virtual capital. Use your virtual capital to purchase stocks. Watch your portfolio grow and adapt your strategy as you learn. <br />
                        - Compete and Climb the Ranks: Challenge other users in a battle of investment wits. Aim to have the most valuable portfolio by the end of the league.
                    </Typography>
                );
            case 1:
                return (
                    <Typography>
                        The following information will be needed to create an account: <br />
                        Username, Password, First Name, Last Name, and email. <br />
                        By default, your avatar will be the first and last initials. <br />
                        You are welcome to upload an image to serve as your avatar. <br />
                        Once you create an account, you will be able to login to the web application to view, join, or create leagues. <br />
                        You won't be able to create a portfolio or view any league information until you join.<br />

                        <Link to="/register" style={{ textDecoration: 'none' }}>Click here to register a new account.</Link>
                    </Typography>
                );
            case 2:
                return (
                    <Typography>
                        A list of public leagues for anyone to join will be listed on your profile page. <br />
                        Otherwise, create a new league with friends. <br />
                        Simply provide a name, duration, initial capital investment, and any asset limitations (optional).
                    </Typography>
                );
            default:
                return 'Unknown step';
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 2, mb: 1 }}>
                <div>
                    <StepContent stepIndex={activeStep} />
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === steps.length - 1 ? (
                            <Button onClick={handleReset}>Reset</Button>
                        ) : (
                            <Button onClick={handleNext}>Next</Button>
                        )}
                    </Box>
                </div>
            </Box>
        </Box>
    );
};

export default Rules;
