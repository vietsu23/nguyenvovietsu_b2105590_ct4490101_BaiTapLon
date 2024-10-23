const NhaXuatBan = require('../models/nhaxuatban');

// Tạo mới một nhà xuất bản
exports.createNXB = async (data) => {
  try {
    const newNXB = new NhaXuatBan(data);
    return await newNXB.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo nhà xuất bản: ${error.message}`);
  }
};

// Lấy danh sách tất cả nhà xuất bản
exports.getAllNXB = async () => {
  try {
    return await NhaXuatBan.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách nhà xuất bản: ${error.message}`);
  }
};

// Lấy thông tin nhà xuất bản theo mã NXB (MaNXB)
exports.getNXBById = async (id) => {
  try {
    return await NhaXuatBan.findOne({ MaNXB: id });
  } catch (error) {
    throw new Error(`Lỗi khi lấy nhà xuất bản: ${error.message}`);
  }
};

// Cập nhật thông tin nhà xuất bản theo mã NXB (MaNXB)
exports.updateNXB = async (id, data) => {
  try {
    return await NhaXuatBan.findOneAndUpdate({ MaNXB: id }, data, { new: true });
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật nhà xuất bản: ${error.message}`);
  }
};

// Xóa nhà xuất bản theo mã NXB (MaNXB)
exports.deleteNXB = async (id) => {
  try {
    return await NhaXuatBan.findOneAndDelete({ MaNXB: id });
  } catch (error) {
    throw new Error(`Lỗi khi xóa nhà xuất bản: ${error.message}`);
  }
};