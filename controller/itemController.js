const Item = require('../model/item');
const async = require('async');
const constant = require('../constant');
class ItemController {
  getAll(req, res, next) {

    async.series({
      totalCount: (done) => {
        Item.count(done);
      },
      items: (done) => {
        Item.find({}).populate('categoryId').exec(done)
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const _id = req.params.id;
    Item.findOne({_id}).populate('categoryId').exec((err, doc) => {
      if (err) {
        return next(err);
      }

      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }

      return res.status(constant.httpCode.OK).send(doc);
    });
  }

  create(req, res, next) {
    Item.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send(`/items/${doc._id}`);
    })
  }

  delete(req, res, next) {
    const _id = req.params.id;

    Item.findOneAndRemove({_id}, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND)
      }

      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const _id = req.params.id;

    Item.findOneAndUpdate({_id}, req.body, (err, doc) => {
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

module.exports = ItemController;