const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  price: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;