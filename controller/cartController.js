const Cart = require('../model/cart');
const async = require('async');
const constant = require('../constant');
const changeItemToItemUrl = require('../tool/change-item-to-url');

class CartController {
  getAll(req, res, next) {
    async.series({
        totalCount: (done) => {
          Cart.count(done);
        },
        carts: (done) => {
          Cart.find({}, (err, doc) => {
            if (err) {
              done(err, null);
            }

            let docs = doc.map((data) => {
              let items = changeItemToItemUrl(data.items);
              let newData = data.toJSON();
              newData.items = items;
              return newData;
            });
            done(null, docs);
          });
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
      let items = changeItemToItemUrl(doc.items);
      let docs = doc.toJSON();
      docs.items = items;

      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }

      return res.status(constant.httpCode.OK).send(docs);
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

    Cart.findOneAndUpdate({_id}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }
}

module.exports = CartController;