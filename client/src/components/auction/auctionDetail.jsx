import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import { Box, Typography, Card, Button } from '@mui/material';
import { format } from "date-fns";


function AuctionDetail() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const [highestPrice, setHighestPrice] = useState('');
    const [winnerId, setWinnerId] = useState('');

    const navigate = useNavigate();

    const userRole = localStorage.getItem('role');
    const currentUser = localStorage.getItem('uid');
    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auctions/${auctionId}`);
                const data = await response.json();
                setAuction(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        const fetchHighestPrice = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/bids/highestPrice/${auctionId}`);
                const data = await response.json();
                setHighestPrice(data.price);
                setWinnerId(data.userId);
            } catch (error) {
                console.error('Fetch highest price error:', error);
            }
        };

        fetchHighestPrice();
        fetchAuction();
    }, [auctionId]);

    const handleDelete = async (e) => {
        const confirmDelete = window.confirm("Are you sure?");

        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auctions/${auctionId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    window.alert('Auction deleted successfully');
                    window.history.back();
                } else {
                    // Xử lý trường hợp lỗi khi xóa
                    console.error('Failed to delete auction');
                }
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
    }

    const handleBidding = () => {
        navigate(`/biddingPage/${auctionId}`)
    }


    if (!auction) {
        return <div>Loading...</div>;
    }

    const endTime = new Date(auction.endTime);
    const now = new Date();
    const checkTimeOutForBidding = now - endTime;


    return (
        <>
            <Card sx={{ padding: '2rem', width: '1000px', margin: 'auto', position: "relative", marginTop: "20px" }}>
                {(userRole === 'admin' || auction.userId === currentUser) && ( // Kiểm tra nếu người dùng là admin hoặc sở hữu phiên đấu giá và thời gian đấu giá vẫn còn
                    <Button
                        sx={{
                            position: 'absolute',
                            right: '18px',
                            color: 'red'
                        }}
                        aria-label="delete"
                        onClick={handleDelete}
                    >
                        Delete this auction
                    </Button>
                )}
                {(userRole !== 'admin' && auction.userId !== currentUser && checkTimeOutForBidding < 0) && ( // Kiểm tra nếu người dùng không phải là admin hoặc sở hữu phiên đấu giá, và thời gian đấu giá vẫn còn
                    <Button
                        variant='contained'
                        sx={{
                            position: 'absolute',
                            right: '18px',
                        }}
                        aria-label="go-to-bidding-page"
                        onClick={handleBidding}
                    >
                        Bidding this Auction
                    </Button>
                )}
                {checkTimeOutForBidding >= 0 && (
                    <Typography variant="body1" color="error" sx={{ position: 'absolute', right: '18px', marginTop: '60px' }}>
                        Auction has ended
                    </Typography>
                )}
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem', marginTop: '10px', textAlign: 'center' }}>
                    Auction Detail
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {auction.title}
                </Typography>
                <Box component="img" width="60%" src={auction.imageUrl} />
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    Description: {auction.description}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    Init Price: ${auction.initPrice}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    Start at: {format(new Date(auction.startTime), 'dd/MM/yyyy hh:mm')}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    End at: {format(new Date(auction.endTime), 'dd/MM/yyyy hh:mm')}
                </Typography>
                {checkTimeOutForBidding >= 0 && (
                    <Typography variant="h6" sx={{ marginTop: '0.5rem', color: 'green' }}>
                        Winner: ${highestPrice} - UserId: {winnerId}
                    </Typography>
                )}

            </Card>
        </>
    );
}

export default AuctionDetail;
