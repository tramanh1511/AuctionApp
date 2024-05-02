const { getAuctionById } = require("../models/auctions.model")

async function checkEndTime(req, res, next) {
    try {
        const auctionId = req.body.auctionId;
        const auction = await getAuctionById(auctionId);
        const endTime = new Date(auction.endTime);

        const now = new Date();
        if (now >= endTime) {
            throw new Error("Time ended");
        }
        next();
    }
    catch (e) {
        console.log("Time for bidding out!")
    }
}

module.exports = {
    checkEndTime
}