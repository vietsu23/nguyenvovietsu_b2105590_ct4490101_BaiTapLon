const express = require('express');
const router = express.Router();
const docgiaController = require('../controllers/docGiaController');

// Tạo mới một đọc giả
router.post('/', docgiaController.createDocGia);

// Lấy danh sách tất cả đọc giả
router.get('/', docgiaController.getAllDocGia);

// Lấy thông tin đọc giả theo mã đọc giả (MaDocGia)
router.get('/:id', docgiaController.getDocGiaById);

// Cập nhật thông tin đọc giả theo mã đọc giả (MaDocGia)
router.put('/:id', docgiaController.updateDocGia);

// Xóa đọc giả theo mã đọc giả (MaDocGia)
router.delete('/:id', docgiaController.deleteDocGia);

module.exports = router;