let mongoose = require('mongoose')
let orderSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    cardId: {
        type: String,
        required: true,
    },
    netPayable: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
})
orderSchema.pre('save', function (next) {
    let now = Date.now()
    this.updatedAt = now
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
})
module.exports = mongoose.model('transaction', orderSchema)