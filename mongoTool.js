"use strict";

const Cart = require('./model/cart');
const Category = require('./model/category');
const Item = require('./model/item');
const cart = require('./refreshMongo/cart');
const category = require('./refreshMongo/category');
const item = require('./refreshMongo/item');
const async = require('async');
function refreshMongo(done) {
  Cart.remove({}, ()=> {
    Cart.create(cart, ()=> {
      Category.remove({}, () => {
        Category.create(category, ()=> {
          Item.remove({}, () => {
            Item.create(item, ()=> {
              done();
            });
          })
        });
      });
    });
  });
}

module.exports = {refreshMongo};


