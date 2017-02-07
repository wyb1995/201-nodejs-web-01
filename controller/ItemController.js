let Item = require('../model/items');
let async = require('async');

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
            return res.send({totalCount: count, items: doc});
        })
    }

    getOne(req, res, next) {
        let _id = req.params.id;

        Item.findOne({_id}).populate('category').exec((err, doc) => {
            if (err) {
                return next(err);
            }

            if (!doc) {
                return res.sendStatus(404);
            }

            return res.send(doc);
        })
    }

    create(req, res, next) {
        let name = req.body.name;
        let price = req.body.price;
        let categoryId = req.body.categoryId;

        Item.create({name, price, category: categoryId}, (err, doc) => {
            if (err) {
                return next(err);
            }
            return res.send(`/items/${doc._id}`);
        })
    }

    delete(req, res, next) {
        let _id = req.params.id;

        Item.findOneAndRemove({_id}, (err, doc)=> {
            if(err){
                return next(err);
            }
            if(!doc){
                return res.sendStatus(404)
            }

            return res.sendStatus(204);
        })
    }

    update(req, res, next) {
        let _id = req.params.id;
        let {categoryId, name, price} = req.body;

        Item.findOneAndUpdate({_id}, {category: categoryId, name, price}, (err)=> {
            if(err) {
                return next(err);
            }

            return res.sendStatus(204);
        })
    }
}

module.exports = ItemController;