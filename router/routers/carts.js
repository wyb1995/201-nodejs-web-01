const express = require('express');
const CartController = require('../../controller/CartController');


const router = express.Router();
const cartCtrl = new CartController();

router.get('/', cartCtrl.getAll);
router.get('/:id', cartCtrl.getOne);
router.post('/', cartCtrl.create);
router.delete('/:id', cartCtrl.deleteAll);
router.delete('/:id/items/:itemId', cartCtrl.deleteOne);
router.put('/:id/items/:itemId', cartCtrl.addItem);

module.exports = router;