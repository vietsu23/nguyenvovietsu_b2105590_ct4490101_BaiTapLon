const theoDoiMuonSachService = require('../services/theoDoiMuonSachService');

// Lấy danh sách tất cả bản ghi theo dõi mượn sách
exports.getAllTheoDoiMuonSach = async (req, res) => {
  try {
    const theoDoiMuonSachList = await theoDoiMuonSachService.getAllTheoDoiMuonSach();
    res.json(theoDoiMuonSachList);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách theo dõi mượn sách', error: error.message });
  }
};

// Lấy thông tin theo dõi mượn sách theo ID
exports.getTheoDoiMuonSachById = async (req, res) => {
  try {
    const theoDoiMuonSach = await theoDoiMuonSachService.getTheoDoiMuonSachById(req.params.id);
    if (!theoDoiMuonSach) {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi theo dõi mượn sách' });
    }
    res.json(theoDoiMuonSach);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin theo dõi mượn sách', error: error.message });
  }
};

// Tạo mới một bản ghi theo dõi mượn sách
exports.createTheoDoiMuonSach = async (req, res) => {
  try {
    const newTheoDoiMuonSach = await theoDoiMuonSachService.createTheoDoiMuonSach(req.body);
    res.status(201).json(newTheoDoiMuonSach);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo bản ghi theo dõi mượn sách', error: error.message });
  }
};

// Cập nhật thông tin theo dõi mượn sách theo ID
exports.updateTheoDoiMuonSach = async (req, res) => {
  try {
    const updatedTheoDoiMuonSach = await theoDoiMuonSachService.updateTheoDoiMuonSach(req.params.id, req.body);
    if (!updatedTheoDoiMuonSach) {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi theo dõi mượn sách' });
    }
    res.json(updatedTheoDoiMuonSach);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin theo dõi mượn sách', error: error.message });
  }
};

// Xóa bản ghi theo dõi mượn sách theo ID
exports.deleteTheoDoiMuonSach = async (req, res) => {
  try {
    const deletedTheoDoiMuonSach = await theoDoiMuonSachService.deleteTheoDoiMuonSach(req.params.id);
    if (!deletedTheoDoiMuonSach) {
      return res.status(404).json({ message: 'Không tìm thấy bản ghi để xóa' });
    }
    res.json({ message: 'Bản ghi theo dõi mượn sách đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa bản ghi theo dõi mượn sách', error: error.message });
  }
};