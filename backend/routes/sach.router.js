const express = require('express');
const router = express.Router();
const sachController = require('../controllers/sachController');

// Tạo mới một sách
router.post('/', sachController.createSach);

// Lấy danh sách tất cả sách
router.get('/', sachController.getAllSach);

// Lấy thông tin sách theo mã sách (MaSach)
router.get('/:id', sachController.getSachById);

// Cập nhật thông tin sách theo mã sách (MaSach)
router.put('/:id', sachController.updateSach);

// Xóa sách theo mã sách (MaSach)
router.delete('/:id', sachController.deleteSach);

module.exports = router;
