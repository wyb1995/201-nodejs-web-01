let Cart = require('../model/cart');
let async = require('async');
let constant = require('../constant');

class CartController {
    getAll(req, res, next) {
        async.waterfall([
            (done) => {
                Cart.count(done);
            },
            (count, done) => {
                Cart.find({}, (err, doc) => {
                    done(err, doc, count);
                });
            }
        ], (err, doc, count) => {
            if (err) {
                return next(err);
            }
            return res.status(constant.httpCode.OK).send({totalCount: count, carts: doc});
        })
    }

    getOne(req, res, next) {
        let _id = req.params.id;

        Cart.findOne({_id}, (err, doc) => {
            if (err) {
                return next(err);
            }

            if (!doc) {
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }

            return res.status(constant.httpCode.OK).send(doc);
        })
    }

    create(req, res, next) {
        let userId = req.body.userId;

        Cart.create({userId}, (err, doc) => {
            if (err) {
                return next(err);
            }

            return res.status(constant.httpCode.CREATED).send(`/carts/${doc._id}`);
        })
    }

    deleteAll(req, res, next) {
        let _id = req.params.id;

        Cart.findOneAndRemove({_id}, (err) => {
            if (err) {
                return next(err);
            }

            return res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }

    deleteOne(req, res, next) {
        let _id = req.params.id;
        let itemId = req.params.itemId;

        async.waterfall([
            (done) => {
                Cart.findOne({_id}, done);
            },
            (doc, done) => {
                if (doc) {
                    let index = doc.item.indexOf(itemId);
                    doc.item.splice(index, 1);
                    doc.save((err, doc) => {
                        done(err, doc);
                    });
                } else {
                    done(null, null);
                }
            }
        ], (err) => {
            if (err) {
                return next(err);
            }

            return res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }

    addItem(req, res, next) {
        let _id = req.params.id;
        let itemId = req.params.itemId;

        async.waterfall([
            (done) => {
                Cart.findOne({_id}, done);
            },
            (doc, done) => {
                doc.item.push(itemId);
                doc.save(done);
            }
        ], (err)=> {
            if(err){
                return next(err);
            }

            return res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }
}

module.exports = CartController;