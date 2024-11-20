const thongBaoService = require('../services/thongBaoService');

// Gửi thông báo
exports.sendNotification = async (req, res) => {
  try {
    const { maDocGia, maTheoDoiMuonSach, message } = req.body;
    if (!maDocGia || !message) {
      return res.status(400).json({ message: 'Thiếu thông tin bắt buộc (maDocGia, message)' });
    }
    const result = await thongBaoService.sendNotification(maDocGia, maTheoDoiMuonSach, message);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Lỗi khi gửi thông báo' });
  }
};

// Lấy thông báo chưa đọc
exports.getUnreadNotifications = async (req, res) => {
  try {
    const maDocGia = req.params.maDocGia;
    if (!maDocGia) {
      return res.status(400).json({ message: 'Thiếu thông tin maDocGia' });
    }
    const notifications = await thongBaoService.getUnreadNotifications(maDocGia);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Lỗi khi lấy thông báo' });
  }
};

// Đánh dấu thông báo là đã đọc
exports.markAsRead = async (req, res) => {
  try {
    const maDocGia = req.params.maDocGia;
    if (!maDocGia) {
      return res.status(400).json({ message: 'Thiếu thông tin maDocGia' });
    }
    const result = await thongBaoService.markNotificationsAsRead(maDocGia);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Lỗi khi đánh dấu thông báo' });
  }
};
