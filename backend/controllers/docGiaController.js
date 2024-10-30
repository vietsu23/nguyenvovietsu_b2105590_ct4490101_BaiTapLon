const docgiaService = require('../services/DocGiaService');
const DocGia = require('../models/docgia'); // Nhập model DocGia

// Lấy danh sách tất cả đọc giả
exports.getAllDocGia = async (req, res) => {
  try {
    const docgias = await docgiaService.getAllDocGia();
    res.json(docgias);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đọc giả', error: error.message });
  }
};

// Lấy thông tin đọc giả theo ID
exports.getDocGiaById = async (req, res) => {
  try {
    const docgia = await docgiaService.getDocGiaById(req.params.id);
    if (!docgia) {
      return res.status(404).json({ message: 'Không tìm thấy đọc giả' });
    }
    res.json(docgia);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin đọc giả', error: error.message });
  }
};

// Đăng ký đọc giả mới
exports.registerDocGia = async (req, res) => {
  try {
    const newDocGia = await docgiaService.registerDocGia(req.body); // Sử dụng service đăng ký
    res.status(201).json({ message: "Đăng ký thành công!", docGia: newDocGia });
  } catch (error) {
    console.error("Lỗi khi đăng ký đọc giả:", error.message); // Ghi log lỗi
    res.status(500).json({ message: "Lỗi đăng ký", error: error.message });
  }
};

// Đăng nhập đọc giả
exports.loginDocGia = async (req, res) => {
  try {
    const { Email, Password } = req.body; // Chú ý viết đúng tên trường
    const docgia = await docgiaService.loginDocGia(Email, Password);
    res.json({ message: 'Đăng nhập thành công', docgia });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi đăng nhập', error: error.message });
  }
};

// Cập nhật thông tin đọc giả theo ID
exports.updateDocGia = async (req, res) => {
  try {
    const updatedDocGia = await docgiaService.updateDocGia(req.params.id, req.body);
    if (!updatedDocGia) {
      return res.status(404).json({ message: 'Không tìm thấy đọc giả' });
    }
    res.json(updatedDocGia);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin đọc giả', error: error.message });
  }
};

// Xóa đọc giả theo ID
exports.deleteDocGia = async (req, res) => {
  try {
    const deletedDocGia = await docgiaService.deleteDocGia(req.params.id);
    if (!deletedDocGia) {
      return res.status(404).json({ message: 'Không tìm thấy đọc giả để xóa' });
    }
    res.json({ message: 'Đọc giả đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa đọc giả', error: error.message });
  }
};
