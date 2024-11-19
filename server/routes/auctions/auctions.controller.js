const {
    getAuctionById,
    updateAuctionById,
    getAuctionByUserId,
    createNewAuction,
    deleteAuctionById,
    getAllAuctionsFalse,
    getAllAuctionsTrue,
} = require('../../models/auctions.model');

const {
    getUserById
} = require('../../models/users.model');

async function httpGetAllAuctionFalse(req, res) {
    const auctions = await getAllAuctionsFalse();
    return res.status(200).json(auctions)
}

async function httpGetAllAuctionTrue(req, res) {
    const auctions = await getAllAuctionsTrue();
    return res.status(200).json(auctions)
}

async function httpGetAuctionById(req, res) {
    const auctionId = req.params.id;

    const auction = await getAuctionById(auctionId);
    if (!auction) {
        return res.status(404).json({
            error: 'Auction not found',
        });
    }

    console.log(auction);

    return res.status(200).json(auction);
}

async function httpGetAuctionByUserId(req, res) {
    const userId = req.params.id
    console.log(userId);
    const auction = await getAuctionByUserId(userId);
    if (!auction) {
        return res.status(404).json({
            error: 'Auction not found',
        });
    }

    console.log(auction);

    return res.status(200).json(auction);
}

async function httpUpdateAuctionById(req, res) {
    const auctionId = req.params.id;
    const updateData = req.body;

    try {
        const auction = await updateAuctionById(auctionId, updateData);

        if (!auction) {
            return res.status(400).json({
                error: "Auction not found"
            });
        }

        return res.status(200).json(auction);
    } catch (error) {
        console.error("Error updating auction:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }

}

async function httpAddNewAuction(req, res) {
    const auction = req.body;

    try {
        const createdAuction = await createNewAuction(auction)
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err.message,
        });
    }

    return res.status(201).json(auction);
}

async function httpDeleteAuctionById(req, res) {
    const auctionId = req.params.id;

    const deletingAuction = await getAuctionById(auctionId);

    if (deletingAuction) {
        const auction = await deleteAuctionById(auctionId);
        return res.status(200).json(auction);
    } else {
        return res.status(400).json({
            error: "Backend bảo không xóa được!"
        })
    }
}


module.exports = {
    httpGetAllAuctionFalse,
    httpGetAllAuctionTrue,
    httpGetAuctionById,
    httpGetAuctionByUserId,
    httpAddNewAuction,
    httpUpdateAuctionById,
    httpDeleteAuctionById,
}