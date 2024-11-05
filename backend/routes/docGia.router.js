const express = require('express');
const router = express.Router();
const docgiaController = require('../controllers/docGiaController');

router.post('/', docgiaController.registerDocGia);

router.post('/login', docgiaController.loginDocGia);

router.get('/', docgiaController.getAllDocGia);

router.get('/:id', docgiaController.getDocGiaById);

router.put('/:id', docgiaController.updateDocGia);

router.delete('/:id', docgiaController.deleteDocGia);

module.exports = router;
