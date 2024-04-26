import React, { useEffect, useState } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Card, Button } from '@mui/material';

function AuctionDetail() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
    const navigate = useNavigate();

    const userRole = localStorage.getItem('role');
    const currentUser = localStorage.getItem('uid');
    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/auctions/${auctionId}`);
                const data = await response.json();
                setAuction(data);
                console.log(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

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
        window.location.href = '/bidding';
    };

    if (!auction) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Card sx={{ padding: '2rem', width: '1000px', margin: 'auto', position: "relative", marginTop: "20px" }}>
                {(userRole === 'admin' || auction.userId === currentUser) && ( // Kiểm tra nếu người dùng là admin hoặc sở hữu phiên đấu giá
                    <Button sx={{
                        position: 'absolute',
                        right: '18px',
                        color: 'red'

                    }}
                        aria-label="delete"
                        onClick={handleDelete}>
                        Delete this auction
                    </Button>
                ) || (<Button sx={{
                    position: 'absolute',
                    right: '18px',
                    color: 'blue'
                }}
                    aria-label="go-to-bidding-page"
                    onClick={handleBidding}
                >
                    Bidding this Auction
                </Button>
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
                    Status: {auction.status}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    Giá khởi điểm: {auction.initPrice}$
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    Start at: {auction.startTime}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
                    End at: {auction.endTime}
                </Typography>
            </Card >
        </>
    );
}

export default AuctionDetail;
