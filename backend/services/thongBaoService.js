const ThongBao = require('../models/thongbao');

exports.sendNotification = async (maDocGia, maTheoDoiMuonSach, message) => {
  try {
    const thongBao = new ThongBao({ maDocGia, maTheoDoiMuonSach, message });
    await thongBao.save();
    return { success: true, message: 'Thông báo đã được gửi và lưu thành công' };
  } catch (error) {
    console.error('Lỗi khi gửi thông báo:', error);
    throw new Error('Lỗi khi gửi thông báo');
  }
};


exports.getUnreadNotifications = async (maDocGia) => {
  try {
    const notifications = await ThongBao.find({ maDocGia })
      .populate({
        path: 'maTheoDoiMuonSach', // Liên kết tới bảng TheoDoiMuonSach
        populate: { path: 'MaSach', select: 'TenSach' }, // Lấy thông tin tên sách từ bảng Sach
      })
      .sort({ createdAt: -1 });
    return notifications;
  } catch (error) {
    console.error('Lỗi khi lấy thông báo:', error);
    throw new Error('Lỗi khi lấy thông báo');
  }
};


exports.markNotificationsAsRead = async (maDocGia) => {
  try {
    
    const result = await ThongBao.findOneAndDelete({ maDocGia: maDocGia });

    if (!result) {
      throw new Error('Không tìm thấy thông báo nào để xóa');
    }
    return result; 
  } catch (error) {
    throw new Error(`Lỗi khi xóa thông báo: ${error.message}`);
  }
};


