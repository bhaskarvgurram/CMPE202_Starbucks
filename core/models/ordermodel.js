
let mongoose = require('mongoose')
var itemSchema = new mongoose.Schema({
    itemId: 'string',
    name: 'string',
    category: 'string',
    price: Number,
    quantity : Number,
});
let orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        trim: true,
        unique:true,
    },
    userId: {
        type: String,
        trim: true,
    },
    items: [itemSchema],
    grandTotal: {
        type: Number,
        trim: true,
    },
    taxes: {
        type: Number,
        trim: true,
    },
    netPayable: {
        type: Number,
        trim: true,
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
module.exports = mongoose.model('order', orderSchema)