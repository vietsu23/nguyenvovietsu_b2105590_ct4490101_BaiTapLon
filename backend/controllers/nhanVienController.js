const nhanvienService = require('../services/nhanvienService');

// Lấy danh sách tất cả nhân viên
exports.getAllNhanVien = async (req, res) => {
  try {
    const nhanviens = await nhanvienService.getAllNhanVien();
    res.json(nhanviens);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách nhân viên', error: error.message });
  }
};

// Lấy thông tin nhân viên theo MSNV
exports.getNhanVienById = async (req, res) => {
  try {
    const nhanvien = await nhanvienService.getNhanVienById(req.params.id);
    if (!nhanvien) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }
    res.json(nhanvien);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin nhân viên', error: error.message });
  }
};

// Tạo mới một nhân viên
exports.createNhanVien = async (req, res) => {
  try {
    const newNhanVien = await nhanvienService.createNhanVien(req.body);
    res.status(201).json(newNhanVien);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo nhân viên', error: error.message });
  }
};

// Cập nhật thông tin nhân viên theo MSNV
exports.updateNhanVien = async (req, res) => {
  try {
    const updatedNhanVien = await nhanvienService.updateNhanVien(req.params.id, req.body);
    if (!updatedNhanVien) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }
    res.json(updatedNhanVien);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin nhân viên', error: error.message });
  }
};

// Xóa nhân viên theo MSNV
exports.deleteNhanVien = async (req, res) => {
  try {
    const deletedNhanVien = await nhanvienService.deleteNhanVien(req.params.id);
    if (!deletedNhanVien) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa' });
    }
    res.json({ message: 'Nhân viên đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa nhân viên', error: error.message });
  }
};
