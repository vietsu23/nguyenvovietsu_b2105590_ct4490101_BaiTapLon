const NhanVien = require('../models/nhanvien');

// Tạo mới một nhân viên
exports.createNhanVien = async (data) => {
  try {
    const newNhanVien = new NhanVien(data);
    return await newNhanVien.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo nhân viên: ${error.message}`);
  }
};

// Lấy danh sách tất cả nhân viên
exports.getAllNhanVien = async () => {
  try {
    return await NhanVien.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách nhân viên: ${error.message}`);
  }
};

// Lấy thông tin nhân viên theo ID (MSNV)
exports.getNhanVienById = async (id) => {
  try {
    return await NhanVien.findOne({ MSNV: id });
  } catch (error) {
    throw new Error(`Lỗi khi lấy nhân viên: ${error.message}`);
  }
};

// Cập nhật thông tin nhân viên theo ID (MSNV)
exports.updateNhanVien = async (id, data) => {
  try {
    return await NhanVien.findOneAndUpdate({ MSNV: id }, data, { new: true });
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật nhân viên: ${error.message}`);
  }
};

// Xóa nhân viên theo ID (MSNV)
exports.deleteNhanVien = async (id) => {
  try {
    return await NhanVien.findOneAndDelete({ MSNV: id });
  } catch (error) {
    throw new Error(`Lỗi khi xóa nhân viên: ${error.message}`);
  }
};
