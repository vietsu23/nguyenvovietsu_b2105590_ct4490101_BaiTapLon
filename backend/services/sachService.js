const Sach = require('../models/sach');

exports.createSach = async (data) => {
  try {
    const newSach = new Sach({
      ...data,
      coverImagePath: data.coverImagePath || '',
    });
    return await newSach.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo sách: ${error.message}`);
  }
};

exports.getAllSach = async () => {
  try {
    return await Sach.find().populate('MaNXB'); 
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách sách: ${error.message}`);
  }
};

exports.getSachById = async (id) => {
  try {
    return await Sach.findById(id).populate('MaNXB');
  } catch (error) {
    throw new Error(`Lỗi khi lấy sách: ${error.message}`);
  }
};

exports.updateSach = async (id, data) => {
  try {
    return await Sach.findByIdAndUpdate(
      id,
      data,
      { new: true }
    ).populate('MaNXB');
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật sách: ${error.message}`);
  }
};

exports.deleteSach = async (id) => {
  try {
    return await Sach.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Lỗi khi xóa sách: ${error.message}`);
  }
};
