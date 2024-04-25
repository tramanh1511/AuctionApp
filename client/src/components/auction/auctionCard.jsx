import React from 'react';
import { Card, Button, CardActions, CardContent, Typography, Box, } from '@mui/material';
import CountdownTimer from './countDownTime';
import { Link } from 'react-router-dom';

function AuctionCard({ auction }) {
    const { auctionId, imageUrl, title, status, initPrice, endTime } = auction;
    let color;
    switch (status) {
        case 'processing':
            color = 'green';
            break;
        case 'ended':
            color = 'red';
            break;
        case 'waiting':
            color = 'yellow';
            break;
        default:
    }
    const currentTime = new Date();
    // const duration = new Date(Timeend) - currentTime;
    return (
        <Link to={`/${auctionId}`}>
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
                        {/* <Typography variant="body1">{title}</Typography> */}
                        {/* <Typography variant="body1">{status}</Typography> */}
                    </Box>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }} size="sm">
                        {title}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Trạng thái: <span style={{ color: color }}>{status}</span>
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                        Giá khởi điểm: {initPrice}$
                    </Typography>
                    <CountdownTimer startTime={currentTime.toISOString()} />
                </CardContent>

                <CardActions>
                    <Button
                        size="large"
                        variant="contained"
                    >
                        Bấm để chọn
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
}

export default AuctionCard;