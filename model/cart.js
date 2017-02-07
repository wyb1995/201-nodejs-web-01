const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: Number,
  items: [{
    itemCount: Number,
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }
  }]
});

module.exports = mongoose.model('Cart', CartSchema);