let Cart = require('./model/cart');
let Category = require('./model/category');
let Item = require('./model/items');
let cart = require('./refreshMongo/cart');
let category = require('./refreshMongo/category');
let item = require('./refreshMongo/item');
let async = require('async');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/supermarket');
async.waterfall([
    (done)=> {
        Cart.remove({}, done);
    },
    (doc, done)=> {
        Cart.create(cart, done);
    },
    (doc, done)=> {
        Category.remove({}, done);
    },
    (doc, done)=> {
        Category.create(category, done);
    },
    (doc, done)=> {
        Item.remove({}, done);
    },
    (doc, done)=> {
        Item.create(item, done);
    }
], (err)=> {
    if(err){
        console.log('refreshMongo failed');
    }
    mongoose.connection.close();
});

