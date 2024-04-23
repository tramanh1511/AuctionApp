const Auction = require('./auctions.mongo');

const {
    generateUuid
} = require('../services/uuid');
const {
    getUserById
} = require('./users.model');

async function getAllAuctions(title, userId) {
    if (title) {
        const regex = new RegExp(title, 'i');
        return await Auction
            .find({ title: regex })
    } else if (userId) {
        const user = await getUserById(userId);
        if (user.isAdmin) {
            return await Auction
                .find({ approved: false });
        }
        return await Auction
            .find({ userId: userId })
    } else {
        return await Auction
            .find()
    }
};

async function getAllAuctionsTrue(title, userId) {
    if (title) {
        const regex = new RegExp(title, 'i');
        return await Auction
            .find({ title: regex })
    } else if (userId) {
        const user = await getUserById(userId);
        if (user.isAdmin) {
            return await Auction
                .find({ approved: true });
        }
        return await Auction
            .find({ userId: userId })
    } else {
        return await Auction
            .find()
    }
};

async function getAuctionById(auctionId) {
    return await Auction
        .findOne({ auctionId: auctionId })
}

async function approveAuctionById(auctionId) {
    const auction = await getAuctionById(auctionId);
    if (!auction) {
        return null;
    }
    const now = new Date().toLocaleString();
    auction.approved = true;
    auction.lastUpdated = now;
    auction.status = "Đang đấu giá"
    auction.save();
    return auction;
}

async function saveAuction(auction) {
    await Auction.create(auction);
}

async function createNewAuction(auction) {
    const now = new Date().toLocaleString();

    const newAuction = Object.assign(auction, {
        auctionId: generateUuid(),
        userId: auction.userId,
        category: auction.category,
        title: auction.title,
        description: auction.description,
        imageUrl: auction.imageUrl,
        initPrice: auction.initPrice,
        approved: false,
        lastUpdated: now,
        status: "Đang chờ phê duyệt",
    })
    await saveAuction(newAuction);

    return newAuction;
}

async function deleteAuctionById(auctionId) {
    const auction = Auction.findOneAndDelete({ auctionId: auctionId });
    return auction;
}
async function approveAuction(auctionId) {
    try {
        const auction = await Auction.findById(auctionId);
        if (!auction) {
            console.log("Auction not found.");
            return false;
        }

        // Cập nhật trường approved thành true
        auction.approved = true;
        await auction.save(); // Lưu thay đổi

        console.log("Auction approved successfully.");
        return true; // Hoặc bạn có thể trả về một giá trị hoặc thông báo khác nếu cần
    } catch (error) {
        console.error("Error approving auction:", error);
        return false; // Xử lý lỗi hoặc trả về false nếu có lỗi xảy ra
    }
}


module.exports = {
    getAllAuctionsTrue,
    getAllAuctions,
    getAuctionById,
    approveAuctionById,
    createNewAuction,
    deleteAuctionById,
    approveAuction,
}