const nxbService = require('../services/nxbService');

// Lấy danh sách tất cả nhà xuất bản
exports.getAllNXB = async (req, res) => {
  try {
    const nxbs = await nxbService.getAllNXB();
    res.json(nxbs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách nhà xuất bản', error: error.message });
  }
};

// Lấy thông tin nhà xuất bản theo mã NXB (MaNXB)
exports.getNXBById = async (req, res) => {
  try {
    const nxb = await nxbService.getNXBById(req.params.id);
    if (!nxb) {
      return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản' });
    }
    res.json(nxb);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin nhà xuất bản', error: error.message });
  }
};

// Tạo mới một nhà xuất bản
exports.createNXB = async (req, res) => {
  try {
    const newNXB = await nxbService.createNXB(req.body);
    res.status(201).json(newNXB);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo nhà xuất bản', error: error.message });
  }
};

// Cập nhật thông tin nhà xuất bản theo mã NXB (MaNXB)
exports.updateNXB = async (req, res) => {
  try {
    const updatedNXB = await nxbService.updateNXB(req.params.id, req.body);
    if (!updatedNXB) {
      return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản' });
    }
    res.json(updatedNXB);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin nhà xuất bản', error: error.message });
  }
};

// Xóa nhà xuất bản theo mã NXB (MaNXB)
exports.deleteNXB = async (req, res) => {
  try {
    const deletedNXB = await nxbService.deleteNXB(req.params.id);
    if (!deletedNXB) {
      return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản để xóa' });
    }
    res.json({ message: 'Nhà xuất bản đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa nhà xuất bản', error: error.message });
  }
};
