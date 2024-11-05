const docgiaService = require('../services/docgiaService');
const DocGia = require('../models/docgia'); 

exports.getAllDocGia = async (req, res) => {
  try {
    const docgias = await docgiaService.getAllDocGia();
    res.json(docgias);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đọc giả', error: error.message });
  }
};

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

exports.registerDocGia = async (req, res) => {
  try {
    const newDocGia = await docgiaService.registerDocGia(req.body); 
    res.status(201).json({ message: "Đăng ký thành công!", docGia: newDocGia });
  } catch (error) {
    console.error("Lỗi khi đăng ký đọc giả:", error.message); 
    res.status(500).json({ message: "Lỗi đăng ký", error: error.message });
  }
};

exports.loginDocGia = async (req, res) => {
  try {
    const { Email, Password } = req.body; 
    const docgia = await docgiaService.loginDocGia(Email, Password);
    res.json({ message: 'Đăng nhập thành công', docgia });
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi đăng nhập', error: error.message });
  }
};

exports.updateDocGia = async (req, res) => {
  try {
    const updatedDocGia = await docgiaService.updateDocGia(req.params.id, req.body);
    if (!updatedDocGia) {
      return res.status(404).json({ message: 'Không tìm thấy đọc giả' });
    }
    res.json({ message: "Cập nhật thành công", data: updatedDocGia });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin đọc giả', error: error.message });
  }
};

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


