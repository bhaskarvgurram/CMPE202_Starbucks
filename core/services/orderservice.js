const rs = require("./../commons/responses");
const utils = require("./../commons/utils");
const _ = require("lodash");
let userModel = require('./../models/usermodel');
let orderModel = require('./../models/ordermodel');
let itemModel = require('./../models/itemmodel');
let transactionModel = require('./../models/transactionmodel');
const Cards = require("./../models/cardmodel");
let userservice = require('./userservice').service;
let service = {
    checkoutOrder: (...args) => {
        return new Promise(function (resolve, reject) {
            try {
                let _session = args[0] || {};
                let orderId = args[1] || null;
                let body = args[2] || {};
                let select = {
                    "__v": 0,
                    "_id": 0
                };
                if (!body.userId || !body.cardId || !body.orderId || !body.cardCVV) {
                    console.log(body);
                    reject([rs.invalidrequest]);
                    return;
                }
                let _order = null;
                let cardDetails = null;
                orderModel
                    .findOne({
                        orderId: body.orderId
                    })
                    .then((dbObj) => {
                        if (!!dbObj) {
                            _order = dbObj;
                            return Cards.findOne({
                                _id: body.cardId
                            })
                        } else {
                            Promise.reject(rs.notfound);
                            return;
                        }
                    })
                    .then((dbObj) => {
                        cardDetails = dbObj || {};
                        if (cardDetails.cardCVV !== body.cardCVV) {
                            return Promise.reject([{
                                code: "CARDERROR",
                                mesaage: "Invalid PIN"
                            }]);
                            return;
                        } else if (cardDetails.balance < _order.netPayable) {
                            return Promise.reject([{
                                code: "CARDERROR",
                                mesaage: "Insufficient Balance"
                            }]);
                            return;
                        } else {
                            return transactionModel.create({
                                transactionId: utils.getUniqueId(),
                                userId: body.userId,
                                orderId: _order.orderId,
                                cardId: body.cardId,
                                netPayable: _order.netPayable,
                            })
                        }
                    })
                    .then((dbObj) => {
                        if (!!dbObj) {
                            return Cards.findOneAndUpdate({
                                _id: body.cardId
                            }, {
                                    balance: cardDetails.balance - _order.netPayable
                                })
                        } else {
                            console.log("123456");
                            return Promise.reject([rs.invalidrequest])
                        }
                    })
                    .then((dbObj) => {
                        console.log(dbObj)
                        return userModel.findOneAndUpdate({
                            userId: body.userId
                        }, {
                                orderId: null,
                            })
                    })
                    .then(resolve)
                    .catch((errors) => {
                        reject(errors);
                        return;
                    })

            } catch (e) {
                console.error(e)
                reject(e);
            }
        });
    },
    getMyOrders: (...args) => {
        return new Promise((resolve, reject) => {
            try {
                let _session = args[0] || null;
                let body = args[1] || {};
                let params = args[2] || null;
                let _transactions = null;
                if (!params.userId) {
                    reject([rs.invalidrequest]);
                    return;
                }
                transactionModel.find({
                    userId: params.userId
                })
                    .then(dbObj => {
                        if (!!dbObj) {
                            _transactions = dbObj;
                            orderIds = _transactions.map(transaction => transaction.orderId)
                            return orderModel.find({
                                orderId: { $in: orderIds }
                            })
                        } else {
                            Promise.reject(rs.notfound);
                            return;
                        }
                    })
                    .then(dbObj => {
                        console.log(dbObj)
                        console.log(_transactions)
                        _transactions = _transactions.map(transaction => {
                            return {
                                items: dbObj.find(order => order.orderId === transaction.orderId).items,
                                ...transaction._doc
                            }
                        })
                        console.log(_transactions)
                        resolve(_transactions)
                    })
                    .catch(err => {
                        reject(err)
                    })
            } catch (e) {
                reject(e)
            }
        })
    }
}
let router = {
    checkoutOrder: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Order Placed Successfully. Enjoy Your Meal",
                    code: "ORDER"
                }]
            })
        };
        service.checkoutOrder(req.user, req.params.orderId, req.body).then(successCB, next);
    },
    getMyOrders: (req, res, next) => {
        let successCB = (data) => {
            res.json({
                result: "success",
                response: [{
                    message: "Transactions read successfully",
                    code: "READ"
                }],
                data
            })
        };
        service.getMyOrders(req.user, req.body, req.params).then(successCB, next);
    }
};
module.exports.service = service;
module.exports.router = router;