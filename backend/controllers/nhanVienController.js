const nhanvienService = require('../services/nhanvienService');

exports.loginNhanVien = async (req, res) => {
  const { SoDienThoai, Password } = req.body;
  try {
    const nhanVien = await nhanvienService.loginNhanVien(SoDienThoai, Password);
    res.json(nhanVien);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.getAllNhanVien = async (req, res) => {
  try {
    const nhanviens = await nhanvienService.getAllNhanVien();
    res.json(nhanviens);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách nhân viên', error: error.message });
  }
};

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

exports.createNhanVien = async (req, res) => {
  try {
    const newNhanVien = await nhanvienService.createNhanVien(req.body);
    res.status(201).json(newNhanVien);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo nhân viên', error: error.message });
  }
};

exports.updateNhanVien = async (req, res) => {
  try {
    const updatedNhanVien = await nhanvienService.updateNhanVien(req.params.id, req.body);
    if (!updatedNhanVien) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    }
    res.json({ message: "Cập nhật thành công", data: updatedNhanVien });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin nhân viên', error: error.message });
  }
};

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

exports.updateNhanVienPermission = async (req, res) => {
  const { id } = req.params;
  const { __v } = req.body; // Nhận giá trị _V từ request body

  try {
    const updatedNhanVien = await nhanvienService.updateNhanVienPermission(id, __v);

    if (!updatedNhanVien) {
      return res.status(404).json({ message: 'Không tìm thấy nhân viên!' });
    }

    res.json({
      message: 'Cập nhật quyền thành công!',
      data: updatedNhanVien,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật quyền', error: error.message });
  }
};


