const mongoose = require('mongoose');

const auctionsSchema = new mongoose.Schema({
    auctionId: {
        type: String,
        unique: true,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    initPrice: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
    },
<<<<<<< HEAD
    request: {
        type: String,
        required: true,
    },
=======
>>>>>>> new-origin/main
    lastUpdated: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    winner: {
        type: String,
<<<<<<< HEAD
=======
    },
    currentUsers : {
        type: Array,
    },
    deposit : {
        type: Number,
        required: true,
    },
    stepPrice : {
        type: Number,
        required: true,
    },
    highestPrice : {
        type: Number,
>>>>>>> new-origin/main
    }
});

module.exports = mongoose.model('Auction', auctionsSchema);