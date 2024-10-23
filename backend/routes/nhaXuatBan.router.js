const express = require('express');
const router = express.Router();
const nxbController = require('../controllers/nhaXuatBanController');

// Tạo mới một nhà xuất bản
router.post('/', nxbController.createNXB);

// Lấy danh sách tất cả nhà xuất bản
router.get('/', nxbController.getAllNXB);

// Lấy thông tin nhà xuất bản theo mã NXB (MaNXB)
router.get('/:id', nxbController.getNXBById);

// Cập nhật thông tin nhà xuất bản theo mã NXB (MaNXB)
router.put('/:id', nxbController.updateNXB);

// Xóa nhà xuất bản theo mã NXB (MaNXB)
router.delete('/:id', nxbController.deleteNXB);

module.exports = router;
