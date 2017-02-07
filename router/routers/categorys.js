const express = require('express');
const CateController = require('../../controller/CategoryController');


const router = express.Router();
const cateCtrl = new CateController();

router.get('/', cateCtrl.getAll);
router.get('/:id', cateCtrl.getOne);
router.post('/', cateCtrl.create);
router.delete('/:id', cateCtrl.delete);
router.put('/:id', cateCtrl.update)


module.exports = router;