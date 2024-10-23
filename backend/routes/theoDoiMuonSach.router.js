const express = require('express');
const router = express.Router();
const theoDoiMuonSachController = require('../controllers/theoDoiMuonSachController');

// Tạo mới một bản ghi theo dõi mượn sách
router.post('/', theoDoiMuonSachController.createTheoDoiMuonSach);

// Lấy danh sách tất cả bản ghi theo dõi mượn sách
router.get('/', theoDoiMuonSachController.getAllTheoDoiMuonSach);

// Lấy thông tin theo dõi mượn sách theo ID
router.get('/:id', theoDoiMuonSachController.getTheoDoiMuonSachById);

// Cập nhật thông tin theo dõi mượn sách theo ID
router.put('/:id', theoDoiMuonSachController.updateTheoDoiMuonSach);

// Xóa bản ghi theo dõi mượn sách theo ID
router.delete('/:id', theoDoiMuonSachController.deleteTheoDoiMuonSach);

module.exports = router;
