let mongoose = require('mongoose');

let Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: Number,
    item: [{
        type: Schema.Types.ObjectId,
        ref: 'SuperMarket'
    }]
});

module.exports = mongoose.model('Cart', CartSchema);