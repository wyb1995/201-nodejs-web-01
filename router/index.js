let items = require('./routers/items');
let categories = require('./routers/categorys');
let carts = require('./routers/carts');

module.exports = function (app) {
    app.use('/items', items);
    app.use('/categories', categories);
    app.use('/carts', carts);
}