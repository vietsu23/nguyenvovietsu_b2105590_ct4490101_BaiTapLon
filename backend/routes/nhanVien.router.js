const express = require('express');
const router = express.Router();
const nhanvienController = require('../controllers/nhanVienController');

router.post('/', nhanvienController.createNhanVien);

router.get('/', nhanvienController.getAllNhanVien);

router.post('/login', nhanvienController.loginNhanVien);

router.get('/:id', nhanvienController.getNhanVienById);

router.put('/:id', nhanvienController.updateNhanVien);

router.delete('/:id', nhanvienController.deleteNhanVien);

router.patch('/:id', nhanvienController.updateNhanVienPermission);

module.exports = router;
