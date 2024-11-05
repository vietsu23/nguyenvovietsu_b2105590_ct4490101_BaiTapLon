const nxbService = require('../services/nxbService');

exports.getAllNXB = async (req, res) => {
  try {
    const nxbs = await nxbService.getAllNXB();
    res.json(nxbs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách nhà xuất bản', error: error.message });
  }
};

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

exports.createNXB = async (req, res) => {
  try {
    const newNXB = await nxbService.createNXB(req.body);
    res.status(201).json(newNXB);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo nhà xuất bản', error: error.message });
  }
};

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
