const Cart = require('../model/cart');
const async = require('async');
const constant = require('../constant');

class CartController {
  getAll(req, res, next) {
    async.series({
        totalCount: (done) => {
          Cart.count(done);
        },
        carts: (done) => {
          Cart.find({}, done);
        }
      }, (err, result) => {
        if (err) {
          return next(err);
        }
        return res.status(constant.httpCode.OK).send(result);
      }
    )
  }

  getOne(req, res, next) {
    const _id = req.params.id;

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
    Cart.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }

      return res.status(constant.httpCode.CREATED).send(`/carts/${doc._id}`);
    })
  }

  delete(req, res, next) {
    const _id = req.params.id;

    Cart.findOneAndRemove({_id}, (err) => {
      if (err) {
        return next(err);
      }

      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const _id = req.params.id;

    Cart.findOneAndUpdate({_id}, req.body, (err, doc)=> {
      if(err){
        return next(err);
      }
      if(!doc){
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }
}

module.exports = CartController;