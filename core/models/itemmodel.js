let mongoose = require('mongoose')
let orderSchema = new mongoose.Schema({
    itemId: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    category: {
        type: String,
        trim: true,
    },
    price: {
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
module.exports = mongoose.model('item', orderSchema)
