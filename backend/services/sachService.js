const Sach = require('../models/sach');

// Tạo mới một sách
exports.createSach = async (data) => {
  try {
    const newSach = new Sach(data);
    return await newSach.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo sách: ${error.message}`);
  }
};

// Lấy danh sách tất cả sách
exports.getAllSach = async () => {
  try {
    return await Sach.find().populate('MaNXB'); // Populate để lấy thông tin nhà xuất bản
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách sách: ${error.message}`);
  }
};

// Lấy thông tin sách theo mã sách (MaSach)
exports.getSachById = async (id) => {
  try {
    return await Sach.findOne({ MaSach: id }).populate('MaNXB');
  } catch (error) {
    throw new Error(`Lỗi khi lấy sách: ${error.message}`);
  }
};

// Cập nhật thông tin sách theo mã sách (MaSach)
exports.updateSach = async (id, data) => {
  try {
    return await Sach.findOneAndUpdate({ MaSach: id }, data, { new: true }).populate('MaNXB');
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật sách: ${error.message}`);
  }
};

// Xóa sách theo mã sách (MaSach)
exports.deleteSach = async (id) => {
  try {
    return await Sach.findOneAndDelete({ MaSach: id });
  } catch (error) {
    throw new Error(`Lỗi khi xóa sách: ${error.message}`);
  }
};
