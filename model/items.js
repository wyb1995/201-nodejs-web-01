let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    price: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;