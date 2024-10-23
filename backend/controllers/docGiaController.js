const docgiaService = require('../services/DocGiaService');

// Lấy danh sách tất cả đọc giả
exports.getAllDocGia = async (req, res) => {
  try {
    const docgias = await docgiaService.getAllDocGia();
    res.json(docgias);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đọc giả', error: error.message });
  }
};

// Lấy thông tin đọc giả theo mã đọc giả (MaDocGia)
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

// Tạo mới một đọc giả
exports.createDocGia = async (req, res) => {
  try {
    const newDocGia = await docgiaService.createDocGia(req.body);
    res.status(201).json(newDocGia);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo đọc giả', error: error.message });
  }
};

// Cập nhật thông tin đọc giả theo mã đọc giả (MaDocGia)
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

// Xóa đọc giả theo mã đọc giả (MaDocGia)
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
