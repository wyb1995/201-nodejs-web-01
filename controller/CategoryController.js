let Category = require('../model/category');
let async = require('async');
let Item = require('../model/items');

class CategoryController {
    getAll(req, res, next) {
        async.waterfall([
            (done) => {
                Category.count(done);
            },
            (count, done) => {
                Category.find({}, (err, doc) => {
                    done(err, doc, count);
                })
            }
        ], (err, doc, count) => {
            if (err) {
                return next(err);
            }

            return res.send({totalCount: count, categorys: doc});
        })
    }

    getOne(req, res, next) {
        let _id = req.params.id;

        Category.findOne({_id}, (err, doc)=> {
            if(err){
                return next(err);
            }

            if(!doc) {
                return res.sendStatus(404);
            }

            return res.send(doc);
        })
    }

    create(req, res, next) {
        let name = req.body.name;

        Category.create({name}, (err, doc) => {
            if (err) {
                return next(err);
            }

            return res.send(`/categorys/${doc._id}`);
        })
    }

    delete(req, res, next) {
        let _id = req.params.id;

        async.waterfall([
            (done)=> {
                Item.findOne({_id}, done);
            },
            (doc, done)=> {
                if(doc){
                    done(true, null);
                }

                Category.findOneAndRemove({_id}, done);
            }
        ], (err)=> {
            if(err === true) {
                return res.sendStatus(403);
            }

            if(err) {
                return next(err);
            }

            return res.sendStatus(204);
        })
    }

    update(req, res, next) {
        let _id = req.params.id;
        let {name} = req.body;

        Category.findOneAndUpdate({_id}, {name}, (err)=> {
            if(err) {
                return next(err);
            }

            return res.sendStatus(204);
        })

    }
}

module.exports = CategoryController;