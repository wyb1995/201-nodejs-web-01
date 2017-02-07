let Item = require('../model/items');
let async = require('async');
let constant = require('../constant');
class ItemController {
    getAll(req, res, next) {

        async.waterfall([
            (done) => {
                Item.count(done);
            },
            (count, done) => {
                Item.find({}).populate('category').exec((err, doc) => {
                    done(err, doc, count);
                })
            }
        ], (err, doc, count) => {
            if (err) {
                return next(err);
            }
            return res.status(constant.httpCode.OK).send({totalCount: count, items: doc});
        })
    }

    getOne(req, res, next) {
        let _id = req.params.id;

        Item.findOne({_id}).populate('category').exec((err, doc) => {
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
        let name = req.body.name;
        let price = req.body.price;
        let categoryId = req.body.category;

        Item.create({name, price, categoryId}, (err, doc) => {
            if (err) {
                return next(err);
            }
            return res.status(constant.httpCode.CREATED).send(`/items/${doc._id}`);
        })
    }

    delete(req, res, next) {
        let _id = req.params.id;

        Item.findOneAndRemove({_id}, (err, doc)=> {
            if(err){
                return next(err);
            }
            if(!doc){
                return res.sendStatus(constant.httpCode.NOT_FOUND)
            }

            return res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }

    update(req, res, next) {
        let _id = req.params.id;
        let {categoryId, name, price} = req.body;

        Item.findOneAndUpdate({_id}, {categoryId, name, price}, (err, doc)=> {
            if(err) {
                return next(err);
            }

            if(!doc){
                return res.sendStatus(constant.httpCode.NOT_FOUND);
            }

            return res.sendStatus(constant.httpCode.NO_CONTENT);
        })
    }
}

module.exports = ItemController;