import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';

function AuctionDetail() {
    const { auctionId } = useParams();
    const [auction, setAuction] = useState(null);
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

    if (!auction) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <h2>Auction Detail</h2>
            <p>Title: {auction.title}</p>
            <p>Description: {auction.description}</p>
            <p>Init Price: {auction.initPrice}</p>
            <p>Status: {auction.status}</p>
            {/* Add more details as needed */}
        </Layout>
    );
}

export default AuctionDetail;
