const items = require('./routers/items');
const categories = require('./routers/categorys');
const carts = require('./routers/carts');

module.exports = function (app) {
    app.use('/items', items);
    app.use('/categories', categories);
    app.use('/carts', carts);
};