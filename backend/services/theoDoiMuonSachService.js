const TheoDoiMuonSach = require('../models/theodoimuonsach');

// Tạo mới một bản ghi theo dõi mượn sách
exports.createTheoDoiMuonSach = async (data) => {
  try {
    const newTheoDoiMuonSach = new TheoDoiMuonSach(data);
    return await newTheoDoiMuonSach.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo bản ghi theo dõi mượn sách: ${error.message}`);
  }
};

// Lấy danh sách tất cả bản ghi theo dõi mượn sách
exports.getAllTheoDoiMuonSach = async () => {
  try {
    return await TheoDoiMuonSach.find().populate('MaDocGia').populate('MaSach'); // Populate để lấy thông tin độc giả và sách
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách theo dõi mượn sách: ${error.message}`);
  }
};

// Lấy thông tin theo dõi mượn sách theo ID
exports.getTheoDoiMuonSachById = async (id) => {
  try {
    return await TheoDoiMuonSach.findById(id).populate('MaDocGia').populate('MaSach');
  } catch (error) {
    throw new Error(`Lỗi khi lấy thông tin theo dõi mượn sách: ${error.message}`);
  }
};

// Cập nhật thông tin theo dõi mượn sách theo ID
exports.updateTheoDoiMuonSach = async (id, data) => {
  try {
    return await TheoDoiMuonSach.findByIdAndUpdate(id, data, { new: true }).populate('MaDocGia').populate('MaSach');
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật thông tin theo dõi mượn sách: ${error.message}`);
  }
};

// Xóa bản ghi theo dõi mượn sách theo ID
exports.deleteTheoDoiMuonSach = async (id) => {
  try {
    return await TheoDoiMuonSach.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Lỗi khi xóa bản ghi theo dõi mượn sách: ${error.message}`);
  }
};
