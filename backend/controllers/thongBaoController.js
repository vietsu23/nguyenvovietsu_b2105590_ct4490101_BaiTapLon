const thongBaoService = require('../services/thongBaoService');

exports.sendNotification = async (req, res) => {
  try {
    const { maDocGia, message } = req.body;
    const result = await thongBaoService.sendNotification(maDocGia, message);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi gửi thông báo' });
  }
};

exports.getUnreadNotifications = async (req, res) => {
  try {
    const maDocGia = req.params.maDocGia;
    const notifications = await thongBaoService.getUnreadNotifications(maDocGia);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông báo' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const maDocGia = req.params.maDocGia;
    const result = await thongBaoService.markNotificationsAsRead(maDocGia);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đánh dấu thông báo' });
  }
};
