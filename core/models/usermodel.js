let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    orderId: {
        type: String,
        trim: true,
    },
    userId: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }
})
userSchema.pre('save', function (next) {
    let now = Date.now()
    this.updatedAt = now
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
})
module.exports = mongoose.model('user', userSchema)