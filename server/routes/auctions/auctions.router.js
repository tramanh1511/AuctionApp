const express = require('express');
const {
    httpGetAllAuctionFalse,
    httpGetAllAuctionTrue,
    httpGetAuctionById,
    httpGetAuctionByUserId,
    httpAddNewAuction,
    httpUpdateAuctionById,
    httpDeleteAuctionById,
} = require('./auctions.controller');

const auctionsRouter = express.Router();


auctionsRouter.get('/', httpGetAllAuctionTrue);
auctionsRouter.get('/auctionFalse', httpGetAllAuctionFalse);
auctionsRouter.get('/:id', httpGetAuctionById);
auctionsRouter.get('/yourAuction/:id', httpGetAuctionByUserId);
auctionsRouter.post('/', httpAddNewAuction);
auctionsRouter.patch('/:id', httpUpdateAuctionById);
auctionsRouter.delete('/:id', httpDeleteAuctionById);

module.exports = auctionsRouter;