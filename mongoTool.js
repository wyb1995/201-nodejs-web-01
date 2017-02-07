const Cart = require('./model/cart');
const Category = require('./model/category');
const Item = require('./model/item');
const cart = require('./refreshMongo/cart');
const category = require('./refreshMongo/category');
const item = require('./refreshMongo/item');
function refreshMongo() {
  Cart.remove({}, (err) => {
    return;
  });
  Cart.create(cart);
  Category.remove({}, (err) => {
    return;
  });
  Category.create(category);
  Item.remove({}, (err) => {
    return;
  })
  Item.create(item);
  return;
}

module.exports = {refreshMongo};


