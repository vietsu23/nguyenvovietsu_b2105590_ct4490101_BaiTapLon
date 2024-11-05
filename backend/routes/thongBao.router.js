const express = require('express');
const thongBaoController = require('../controllers/thongBaoController');
const router = express.Router();

router.post('/', thongBaoController.sendNotification);

router.get('/chua-doc/:maDocGia', thongBaoController.getUnreadNotifications);

router.put('/danh-dau-da-doc/:maDocGia', thongBaoController.markAsRead);

module.exports = router;
