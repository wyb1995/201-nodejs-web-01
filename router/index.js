import items from './routers/items';
import categorys from './routers/categorys';
import carts from './routers/carts';

export default function (app) {
    app.use('/items', items);
    app.use('/categorys', categorys);
    app.use('/carts', carts);
}