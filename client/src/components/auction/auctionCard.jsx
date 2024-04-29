import React from 'react';
import { Card, Button, CardActions, CardContent, Typography, Box, } from '@mui/material';
import CountdownTimer from './countDownTime';
import { Link } from 'react-router-dom';

function AuctionCard({ auction }) {
    const { auctionId, imageUrl, title, status, initPrice, startTime, endTime } = auction;
    let colorStatus;
    switch (status) {
        case 'processing':
            colorStatus = 'green';
            break;
        case 'ended':
            colorStatus = 'red';
            break;
        case 'waiting':
            colorStatus = 'yellow';
            break;
        default:
    }
    const currentTime = new Date();
    // const duration = new Date(Timeend) - currentTime;
    return (
        <Link to={`/${auctionId}`} style={{ color: '#0f1a2a' }}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%'
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <img src={imageUrl} alt='Auction' style={{ width: '100%', height: 'auto' }} />
                    </Box>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Status: <span style={{ color: colorStatus }}>{status}</span>
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Init Price: {initPrice}$
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Start at: {startTime}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        End at: {endTime}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="large"
                        variant="contained"
                    >
                        Press to enter
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
}

export default AuctionCard;