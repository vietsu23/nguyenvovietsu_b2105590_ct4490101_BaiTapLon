const express = require('express');
const router = express.Router();
const nhanvienController = require('../controllers/nhanVienController');

// Tạo mới một nhân viên
router.post('/', nhanvienController.createNhanVien);

// Lấy danh sách tất cả nhân viên
router.get('/', nhanvienController.getAllNhanVien);

router.post('/login', nhanvienController.loginNhanVien);
// Lấy thông tin nhân viên theo MSNV
router.get('/:id', nhanvienController.getNhanVienById);

// Cập nhật thông tin nhân viên
router.put('/:id', nhanvienController.updateNhanVien);

// Xóa nhân viên
router.delete('/:id', nhanvienController.deleteNhanVien);

module.exports = router;
