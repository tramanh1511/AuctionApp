const Auction = require('./auctions.mongo');

const {
    generateUuid
} = require('../services/uuid');
const {
    getUserById
} = require('./users.model');

async function getAllAuctionsTrue() {
    return await Auction.find({ approved: true });
};

async function getAllAuctionsFalse() {
    return await Auction.find({ approved: false });
};

async function getAuctionById(auctionId) {
    return await Auction
        .findOne({ auctionId: auctionId })
}

async function getAuctionByUserId(userId) {
    return await Auction.find({ userId: userId })
}

async function updateAuctionById(auctionId, updateData) {
    const auction = await getAuctionById(auctionId);
    if (!auction) {
        return null;
    }
    const now = new Date().toLocaleString();
    auction.request = updateData.request;
    auction.approved = updateData.approved;
    auction.lastUpdated = now;
    auction.status = "processing"
    auction.save();
    return auction;
}

async function saveAuction(auction) {
    await Auction.create(auction);
}

async function createNewAuction(auction) {
    const now = new Date().toLocaleString();
    const startTime = auction.startTime.toLocaleString();
    const endTime = auction.endTime.toLocaleString();

    const newAuction = Object.assign(auction, {
        auctionId: generateUuid(),
        userId: auction.userId,
        category: auction.category,
        title: auction.title,
        description: auction.description,
        imageUrl: auction.imageUrl,
        initPrice: auction.initPrice,
        approved: false,
        request: "Create",
        lastUpdated: now,
        status: "waiting",
        startTime: startTime,
        endTime: endTime
    })
    await saveAuction(newAuction);
    console.log(newAuction)
    return newAuction;
}

async function deleteAuctionById(auctionId) {
    const auction = Auction.findOneAndDelete({ auctionId: auctionId });
    return auction;
}

async function searchAuction(auctionTitle) {
    const regex = new RegExp(auctionTitle, "i");
    return await Auction.find({ title: regex })
}

module.exports = {
    getAllAuctionsFalse,
    getAllAuctionsTrue,
    getAuctionById,
    updateAuctionById,
    getAuctionByUserId,
    createNewAuction,
    deleteAuctionById,
    searchAuction,
}