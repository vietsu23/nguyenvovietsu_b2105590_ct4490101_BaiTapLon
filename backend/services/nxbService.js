const NhaXuatBan = require('../models/nhaxuatban');

exports.createNXB = async (data) => {
  try {
    const newNXB = new NhaXuatBan(data);
    return await newNXB.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo nhà xuất bản: ${error.message}`);
  }
};

exports.getAllNXB = async () => {
  try {
    return await NhaXuatBan.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách nhà xuất bản: ${error.message}`);
  }
};

exports.getNXBById = async (id) => {
  try {
    return await NhaXuatBan.findById(id);
  } catch (error) {
    throw new Error(`Lỗi khi lấy nhà xuất bản: ${error.message}`);
  }
};

exports.updateNXB = async (id, data) => {
  try {
    return await NhaXuatBan.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật nhà xuất bản: ${error.message}`);
  }
};

exports.deleteNXB = async (id) => {
  try {
    return await NhaXuatBan.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Lỗi khi xóa nhà xuất bản: ${error.message}`);
  }
};
