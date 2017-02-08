const Category = require('../model/category');
const async = require('async');
const Item = require('../model/item');
const constant = require('../constant');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      totalCount: (done) => {
        Category.count(done);
      }
      ,
      categories: (done) => {
        Category.find({}, done)
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }

      return res.status(constant.httpCode.OK).send(result);
    })
  }

  getOne(req, res, next) {
    const _id = req.params.categoryId;

    Category.findById(_id, (err, doc) => {
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
    Category.create(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }

      return res.status(constant.httpCode.CREATED).send(`/categories/${doc._id}`);
    })
  }

  delete(req, res, next) {
    const _id = req.params.categoryId;

    async.waterfall([
      (done) => {
        Item.findOne({category: _id}, done);
      },
      (doc, done) => {
        if (doc) {
          done(true, null);
        }

        Category.findByIdAndRemove(_id, done);
      }
    ], (err, doc) => {
      if (err === true) {
        return res.sendStatus(constant.httpCode.BAD_REQUEST);
      }

      if (err) {
        return next(err);
      }

      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }

      return res.sendStatus(constant.httpCode.NO_CONTENT);
    })
  }

  update(req, res, next) {
    const _id = req.params.categoryId;

    Category.findByIdAndUpdate(_id, req.body, (err, doc) => {
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

module.exports = CategoryController;