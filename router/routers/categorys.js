const express = require('express');
const CategoryController = require('../../controller/categoryController');


const router = express.Router();
const categoryCtrl = new CategoryController();

router.get('/', categoryCtrl.getAll);
router.get('/:categoryId', categoryCtrl.getOne);
router.post('/', categoryCtrl.create);
router.delete('/:categoryId', categoryCtrl.delete);
router.put('/:categoryId', categoryCtrl.update);


module.exports = router;