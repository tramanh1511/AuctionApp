import React from 'react';
import { Card, Button, CardActions, CardContent, Typography, Box, } from '@mui/material';
// import HoverableCard from './mui-custom/HoverableCard';
import CountdownTimer from './countDownTime';

function AuctionCard({ auction }) {
    const { imageUrl, title, status, initPrice, endTime } = auction;
    const currentTime = new Date();
    // const duration = new Date(Timeend) - currentTime;
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <img src={imageUrl} alt='Auction' style={{ maxWidth: '100%', height: 'auto' }} />
                    {/* <Typography variant="body1">{title}</Typography> */}
                    {/* <Typography variant="body1">{status}</Typography> */}
                </Box>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    {title}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    Trạng thái: {status}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    Giá khởi điểm: {initPrice}
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
    );
}

export default AuctionCard;