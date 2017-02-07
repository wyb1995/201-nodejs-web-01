let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: Number,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }]
});

module.exports = mongoose.model('Cart', CartSchema);