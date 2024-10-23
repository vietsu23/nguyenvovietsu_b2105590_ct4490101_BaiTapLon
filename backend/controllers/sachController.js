const sachService = require('../services/sachService');

// Lấy danh sách tất cả sách
exports.getAllSach = async (req, res) => {
  try {
    const sachs = await sachService.getAllSach();
    res.json(sachs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sách', error: error.message });
  }
};

// Lấy thông tin sách theo mã sách (MaSach)
exports.getSachById = async (req, res) => {
  try {
    const sach = await sachService.getSachById(req.params.id);
    if (!sach) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }
    res.json(sach);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin sách', error: error.message });
  }
};

// Tạo mới một sách
exports.createSach = async (req, res) => {
  try {
    const newSach = await sachService.createSach(req.body);
    res.status(201).json(newSach);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo sách', error: error.message });
  }
};

// Cập nhật thông tin sách theo mã sách (MaSach)
exports.updateSach = async (req, res) => {
  try {
    const updatedSach = await sachService.updateSach(req.params.id, req.body);
    if (!updatedSach) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }
    res.json(updatedSach);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin sách', error: error.message });
  }
};

// Xóa sách theo mã sách (MaSach)
exports.deleteSach = async (req, res) => {
  try {
    const deletedSach = await sachService.deleteSach(req.params.id);
    if (!deletedSach) {
      return res.status(404).json({ message: 'Không tìm thấy sách để xóa' });
    }
    res.json({ message: 'Sách đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sách', error: error.message });
  }
};
