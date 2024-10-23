const DocGia = require('../models/docgia');

// Tạo mới một đọc giả
exports.createDocGia = async (data) => {
  try {
    const newDocGia = new DocGia(data);
    return await newDocGia.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo đọc giả: ${error.message}`);
  }
};

// Lấy danh sách tất cả đọc giả
exports.getAllDocGia = async () => {
  try {
    return await DocGia.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách đọc giả: ${error.message}`);
  }
};

// Lấy thông tin đọc giả theo mã đọc giả (MaDocGia)
exports.getDocGiaById = async (id) => {
  try {
    return await DocGia.findOne({ MaDocGia: id });
  } catch (error) {
    throw new Error(`Lỗi khi lấy đọc giả: ${error.message}`);
  }
};

// Cập nhật thông tin đọc giả theo mã đọc giả (MaDocGia)
exports.updateDocGia = async (id, data) => {
  try {
    return await DocGia.findOneAndUpdate({ MaDocGia: id }, data, { new: true });
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật đọc giả: ${error.message}`);
  }
};

// Xóa đọc giả theo mã đọc giả (MaDocGia)
exports.deleteDocGia = async (id) => {
  try {
    return await DocGia.findOneAndDelete({ MaDocGia: id });
  } catch (error) {
    throw new Error(`Lỗi khi xóa đọc giả: ${error.message}`);
  }
};
